class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :bio, :location, :gender, :age
end
