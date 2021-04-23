exports = async function({imdbRating, genres, rated, languages}) {
  
  const request = context.services.get('mongodb-atlas').db('sample_mflix').collection('movies');
  
  const lang = languages === undefined ? ["English", "Japanese"] : languages;
  
  const pipeline = [
  {
    $match: {
      "imdb.rating": { $gte: imdbRating },
      genres: { $nin: genres } ,
      rated: { $in: rated },
      languages: { $all: lang }
    }
  }];
  
  return await request.aggregate(pipeline).toArray()
  .then(data => {
    console.log(data.length);
    return data;
  })
  .catch(err => {
    console.log(err.toString());
    return err.toString();
  });
};