Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  resources :messages
  ## ACTION CABLE SERVER
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
