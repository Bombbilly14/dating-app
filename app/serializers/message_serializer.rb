class MessageSerializer < ActiveModel::Serializer
  attributes :id, :body, :recipient_id, :sender_id
end
