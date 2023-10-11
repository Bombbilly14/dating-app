class MessagesController < ApplicationController
  before_action :set_message, only: [:show, :update, :destroy]

  def index
    @messages = Message.where("(sender_id = ? AND recipient_id = ?) OR (sender_id = ? AND recipient_id = ?)", current_user.id, params[:recipient_id], params[:recipient_id], current_user.id)
    render json: @messages
  end

  def show
    render json: @message
  end

  def create
    @message = Message.new(message_params)
    @message.sender_id = current_user.id
    
    

    if @message.save
      render json: @message, status: :created, location: @message
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  def update
    if @message.update(message_params)
      render json: @message
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @message.destroy
  end

  private
    def set_message
      @message = Message.find(params[:id])
    end

    def message_params
      params.require(:message).permit(:body, :recipient_id, :id)
    end
end
