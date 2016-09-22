module ApplicationHelper
  def initialFollowState(user)
    return "followed" if current_user.follows?(user)
    return "unfollowed"
  end
end
