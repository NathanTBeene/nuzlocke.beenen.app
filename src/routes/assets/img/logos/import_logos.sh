while read l; do
  filename=$(echo "$l" | cut -d"/" -f10-)
  echo $filename

  curl "$l" --output $filename
done < all_logos.txt