class ConnectionsController < ApplicationController
    # before_action :set_connection, only: [:show, :update, :destroy]


    def index
      connections = Connection.all

      render json: connections
    end


    def show
      connection = Connection.find(params[:id])

      render json: connection
    end

    def create
      sender = User.find(session[:user_id])
      recipient = User.find(params[:recipient_id])
    
      if sender.sent_connections.exists?(recipient_id: recipient.id)
        render json: { message: "Connection already exists" }, status: :unprocessable_entity
        return
      end
    
      # Check if there is an existing connection request from recipient to sender
      existing_connection = Connection.find_by(sender_id: recipient.id, recipient_id: sender.id)
      if existing_connection
        # If there is, set the existing connection as accepted
        existing_connection.accepted = true
        existing_connection.save!
      else
        # If there isn't, create a new connection request
        connection = Connection.create(sender_id: sender.id, recipient_id: recipient.id)
      end
    
      render json: connection
    end
  
    

    def update
      connection = Connection.find(params[:id])
    
      if connection.accepted.nil?
        connection.accepted = true
      else
        connection.accepted = params[:accepted]
      end
    
      if connection.save
        render json: connection
      else
        render json: connection.errors, status: :unprocessable_entity
      end
    end
    def destroy
      @connection.destroy
    end

    private

      def set_connection
        @connection = Connection.find(params[:id])
      end

      def connection_params
        params.permit(:accepted, :recipient_id)
      end
  end
