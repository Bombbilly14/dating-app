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
        connection = Connection.create!(connection_params)


        render json: connection, status: :created

      end


    def update
      if @connection.update(connection_params)
        render json: @connection
      else
        render json: @connection.errors, status: :unprocessable_entity
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
        params.permit(:accepted, :sender_id, :recipient_id)
      end
  end
