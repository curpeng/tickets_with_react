def screenshot(index, is_full = false)
  page.save_screenshot("tmp/screen#{index}.png", full: is_full)
end
