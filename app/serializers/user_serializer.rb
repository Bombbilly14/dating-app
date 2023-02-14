class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :bio, :location, :gender, :age, :avatar, :sent_messages

  has_one :avatar
  
end
