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
        render json: User.all
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
        params.permit(:name, :email, :password, :bio, :location, :gender, :age, :img, :avatar)
        
    end

    def avatar_params
        params.permit(:img, :id)
    end
end
