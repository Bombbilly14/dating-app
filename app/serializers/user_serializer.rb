class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :bio, :location, :gender, :age

  has_one :avatar
  
end
