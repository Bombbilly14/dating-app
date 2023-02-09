class Avatar < ApplicationRecord
    has_one_attached :img
    belongs_to :user

    # after_save :process_avatar

#   private

#   def process_avatar
#     return unless img.attached?

#     img.processed.resize_to_limit!(300, 300)
#   end
end
