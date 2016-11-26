Rails.application.routes.draw do
  root 'tickets#index'

  devise_scope :users do
    authenticated :user do
      root to: 'tickets#index', as: :authenticated_root
    end

    unauthenticated :user do
      root to: 'devise/sessions#new', as: :unauthenticated_root
    end
  end

  devise_for :users

  resources :tickets
end
