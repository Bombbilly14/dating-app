class UsersController < ApplicationController
    def create
        user = User.create!(user_params)
        #if user && user.authenticate(params[:password])
          session[:user_id] = user.id
          render json: user, status: :created
        #else
          #render json: { errors: "Invalid email or password" }, status: :unauthorized
        #end
    end

    def index
      if params[:gender] && params[:gender_preference]
        @users = User.filter_by_preference(current_user_id: current_user.id, gender: params[:gender], gender_preference: params[:gender_preference])
      else
        @users = User.all
      end
      @users = @users.where.not(id: current_user.connected_users.pluck(:id)) if current_user.present?
      render json: @users
    end


    def show
        user = find_user
        render json: user
    end

    def destroy
        user = User.find(session[:user_id])
        user.destroy

        head :no_content
    end

    def update
        user = User.find(session[:user_id])
        user.update!(user_params)
       
        render json: user, status: :accepted
    end


    private

    def find_user
        user = User.find(params[:id])  
    end

    def user_params
        params.permit(:name, :email, :password, :bio, :location, :gender, :age, :img, :avatar, { gender_preference: [] })
      end
      
    

    def avatar_params
        params.permit(:img, :id)
    end
end
