class AvatarSerializer < ActiveModel::Serializer
include Rails.application.routes.url_helpers
  attributes :id, :img

  def img
    rails_blob_path(object.img, only_path: true) if object.img.attached?
  end
end
