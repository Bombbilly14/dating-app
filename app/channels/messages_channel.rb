class MessagesChannel < ApplicationCable::Channel
  def subscribed
    recipient_id = params[:recipient_id]
    sender_id = params[:sender_id]
    channel_name = [recipient_id, sender_id].sort().join("_")
    stream_from "messages_channel_#{channel_name}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
