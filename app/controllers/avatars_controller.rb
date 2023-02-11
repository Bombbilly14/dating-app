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
            puts "params[:img] value: #{params[:img].inspect}"
           image = ImageProcessing::MiniMagick.source(params[:img])
            puts "Original image size: #{image.size}"
            processed_image = image.resize_to_limit!(250, 200)
            puts "Processed image size: #{processed_image.size}"
            avatar.img.attach(io: processed_image, filename: "#{user.id}_#{Time.now.to_i}_avatar.jpg")
          end


          render json: avatar, status: :accepted

      end

    private

    def avatar_params
        params.permit(:img, :user_id, :avatar)
    end
end
