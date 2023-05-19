class AvatarsController < ApplicationController
    require 'mini_magick'
    require 'image_processing/mini_magick'


    def index
        render json: Avatar.all
    end

    def create
       
        avatar = Avatar.create(avatar_params)

        render json: avatar, status: :created
    end

    def show
        avater = Avatar.find(params[:id])

        render json: avatar
    end

    def update
        user = User.find(session[:user_id])
        avatar = user.avatar
      
        if params[:img].present?
          image = ImageProcessing::MiniMagick.source(params[:img].tempfile.path)

          temp_file = Tempfile.new(["processed_image", ".jpg"])
          image.resize_to_fill(250, 250).call(destination: temp_file.path)
      
          avatar.img.attach(io: File.open(temp_file.path), filename: "#{user.id}_#{Time.now.to_i}_avatar.jpg")
        end
      
        render json: user, status: :accepted
      end


    private

    def avatar_params
        params.permit(:img, :user_id, :avatar)
    end
end
