Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  ## ACTION CABLE SERVER
  
  
  
  resources :connections
  resources :users
  resources :avatars
  resources :messages
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!

  #do i need below?
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }


  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/me", to: "sessions#show"
end
