module Sass::Script::Functions

  def image_path(string)
    string_with_path = "../images/#{unquote(string)}"
    Sass::Script::String.new(string_with_path)
  end
  declare :image_path, :args => [:string]

  def image_url(string)
    assert_type string, :String
    Sass::Script::String.new("url('#{image_path(string)}')")
  end
  declare :image_url, :args => [:string]

  def font_path(string)
    string_with_path = "../fonts/#{unquote(string)}"
    Sass::Script::String.new(string_with_path)
  end
  declare :font_path, :args => [:string]

end
