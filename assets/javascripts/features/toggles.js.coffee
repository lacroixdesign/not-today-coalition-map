# Toggle hide/show
$(document).on "click", "[data-behavior='toggle']", (event) ->
  event.preventDefault()
  $target = $( $(@).attr("href") )
  $target.toggle()
