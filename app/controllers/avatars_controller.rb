class AvatarsController < ApplicationController
    def index
        render json: Avatar.all
    end

    def create
        avatar = Avatar.create!(avatar_params)

        render json: avatar, status: :created
    end

    private

    def avatar_params
        params.permit(:img, :user_id)
    end
end
