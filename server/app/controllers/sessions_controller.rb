class SessionsController < ApplicationController
    def show
        user = User.find(session[:user_id])
        render json: user
     end


     def destroy
         session.clear
         head :no_content
     end

     def create
         user = User.find_by(email: params[:email])
         if user && user.authenticate(params[:password])
             session[:user_id] = user.id
             render json: user
         else
             render json: {error: "Incorrect email or password"}
         end

       end

     
end