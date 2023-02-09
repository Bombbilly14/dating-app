class User < ApplicationRecord
    has_many :sent_messages, class_name: 'Message', foreign_key: 'sender_id'
    has_many :received_messages, class_name: 'Message', foreign_key: 'recipient_id'
    
    has_many :sent_connections, class_name: "Connection", foreign_key: 'sender_id'
    has_many :received_connections, class_name: "Connection", foreign_key: 'recipient_id'

    has_one :avatar

    before_validation :assign_default_avatar, on: :create

  
    
    def assign_default_avatar
        return if self.avatar.present?
      
        default_avatar = Avatar.new
        default_avatar.img.attach(io: File.open(Rails.root.join("app/assets/dating-app-logo.jpg")), filename: "default_avatar.jpg")
        self.avatar = default_avatar
      end

    has_secure_password
end
