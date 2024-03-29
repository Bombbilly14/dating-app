class User < ApplicationRecord
    has_many :sent_messages, class_name: 'Message', foreign_key: 'sender_id'
    has_many :received_messages, class_name: 'Message', foreign_key: 'recipient_id'
    
    has_many :sent_connections, class_name: "Connection", foreign_key: 'sender_id'
    has_many :received_connections, class_name: "Connection", foreign_key: 'recipient_id'

    has_one :avatar
    has_many :connections

    before_validation :assign_default_avatar, on: :create

  
    
  def assign_default_avatar
    return if self.avatar.present?

    default_avatar = Avatar.new
    image = MiniMagick::Image.open(Rails.root.join("app/assets/dating-app-logo.jpg"))
    image.resize "250x250"
    default_avatar.img.attach(io: StringIO.new(image.to_blob), filename: "default_avatar.jpg")
    self.avatar = default_avatar
  end

  def received_connection_requests
    Connection.where(recipient_id: self.id, accepted: nil)
  end

  def self.filter_by_preference(current_user_id:, gender:, gender_preference:)
    where(gender: gender_preference).where.not(id: User.find(current_user_id).connected_users.pluck(:id), gender: gender)
  end



  

  def all_connections
    Connection.where("sender_id = ? OR recipient_id = ?", self.id, self.id)
  end

  def connected_users
    all_connections.map { |connection| connection.sender_id == self.id ? connection.recipient : connection.sender }
  end
    has_secure_password
end
