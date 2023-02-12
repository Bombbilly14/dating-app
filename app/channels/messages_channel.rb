class MessagesChannel < ApplicationCable::Channel
  
  def subscribed
    stop_all_streams
    recipient_id = params[:recipient_id]
    sender_id = params[:sender_id]
    channel_name = [recipient_id, sender_id].sort().join("_")
    stream_from "chat_#{params[:room]}"
  end

  def unsubscribed
    stop_all_streams
    # Any cleanup needed when channel is unsubscribed
  end
end
