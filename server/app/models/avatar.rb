class Avatar < ApplicationRecord
    has_one_attached :img
    belongs_to :user
    
    

   
end
