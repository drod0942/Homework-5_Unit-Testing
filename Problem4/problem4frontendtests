const SongRatingApp = require('./songRatingApp');

describe('SongRatingApp', () => {
  let songRatingApp;
  let pageNavigator;

  beforeEach(() => {
    songRatingApp = new SongRatingApp();
    pageNavigator = new PageNavigator();
  });

  test('should add a rating for a song', () => {
    songRatingApp.rateSong('song1', 4);
    expect(songRatingApp.ratings).toHaveLength(1);
    expect(songRatingApp.ratings[0]).toEqual({ songId: 'song1', rating: 4 });
  });

  test('should calculate the average rating for a song', () => {
    songRatingApp.rateSong('song1', 3);
    songRatingApp.rateSong('song1', 5);
    expect(songRatingApp.getAverageRating('song1')).toBe(4);
  });

  test('should return 0 for average rating if no ratings for a song', () => {
    expect(songRatingApp.getAverageRating('song2')).toBe(0);
  });

  test('should get the highest-rated song', () => {
    songRatingApp.rateSong('song1', 3);
    songRatingApp.rateSong('song2', 5);
    songRatingApp.rateSong('song3', 4);
    expect(songRatingApp.getHighestRatedSong()).toEqual({ songId: 'song2', rating: 5 });
  });

  test('should return null if no ratings for the highest-rated song', () => {
    expect(songRatingApp.getHighestRatedSong()).toBeNull();
  });

  test('should throw an error for an invalid rating', () => {
    expect(() => songRatingApp.rateSong('song1', 6)).toThrow('Invalid rating. Rating must be a number between 1 and 5.');
  });

  test('should navigate to the about page', () => {
    // Simulate navigating from home to about page
    songRatingApp.navigateToAboutPage();
    expect(pageNavigator.getCurrentPage()).toBe('about');
  });

});