class ConnectionSerializer < ActiveModel::Serializer
  attributes :id, :accepted, :sender_id, :recipient_id, :sent_messages, :received_messages
  has_one :sender, serializer: UserSerializer
  has_one :recipient, serializer: UserSerializer

  
end
