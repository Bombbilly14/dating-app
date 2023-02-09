class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :bio, :location, :gender, :age, :avatar

  has_one :avatar, serializer: AvatarSerializer
  
end
