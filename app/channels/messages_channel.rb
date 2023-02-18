class MessagesChannel < ApplicationCable::Channel

  def subscribed
    stop_all_streams

    stream_from "chat_#{params[:room]}"
  end

  def unsubscribed
    stop_all_streams

  end
end
