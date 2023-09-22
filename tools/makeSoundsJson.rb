# ruby script

R = 2**(1/12.0)
Notations = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

def out(notation, cat, idx)
  hz = 440 * R**(idx - 9) * 2**(cat - 4)
  puts <<"EOS"
{ "notation": "#{notation}#{cat}", "label": "#{notation}", "category": #{cat}, "hz": #{hz}, "map": null },
EOS
end

9.times{|cat|
  Notations.each_with_index{|notation, idx|
    next if (cat == 0 && idx < 9) || (cat == 8 && idx > 0)
    out(notation, cat, idx)
  }
}