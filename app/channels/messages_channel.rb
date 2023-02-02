class MessagesChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    recipient_id = params[:recipient_id]
    stream_from "messages_channel_#{recipient_id}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
