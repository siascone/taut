json.user do 
    json.extract! @user, :id, :username, :email, :first_name, :last_name, :display_name
end