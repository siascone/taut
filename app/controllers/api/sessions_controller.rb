class Api::SessionsController < ApplicationController
  def show
    @user = current_user
    if @user
      render 'api/users/show'
    else
      render json: { user: nil }
    end
  end

  def create
    email = params[:email]
    password = params[:password]

    @user = User.find_by_credentials(email, password)

    if @user
      login!(@user)
      render 'api/users/show'
    else
      render json: { errors: ['Invalid credentials.'] }, status: :unauthorized
    end

  end

  def destroy
    if current_user
      logout!
      render json: { message: 'Successfully logged out.' }, status: 200
    else
      render json: { message: 'No one to logout.'}, status: 200
    end
  end
end
