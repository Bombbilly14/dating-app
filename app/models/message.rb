class Message < ApplicationRecord
    belongs_to :sender, class_name: 'User', foreign_key: 'sender_id'
    belongs_to :recipient, class_name: 'User', foreign_key: 'recipient_id'

    validates :body, presence: true
    after_create_commit { broadcast_message }

  private

    def broadcast_message
        ActionCable.server.broadcast("messages_channel#{:channel_name}", {
        message: self.body,
        sender_id: self.sender_id,
        recipient_id: self.recipient_id
        })
    end

    def channel_name
        [recipient_id, sender_id].sort().join("_")
    end
end