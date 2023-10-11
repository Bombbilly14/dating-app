class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :bio, :location, :gender, :age, :avatar, :sent_messages, :avatar_url, :gender_preference
  has_one :avatar

  def avatar_url
    rails_blob_url(object.avatar.img, host: 'localhost', port: 3000) if object.avatar.img.attached?
  end
  
end
