const playerStatsForChart = [
  { name: 'Aaron', level: 6, kd: 2.889 },
  { name: 'Panna', level: 6, kd: 2.5 },
  { name: 'Andrew', level: 4, kd: 5.0 },
  { name: 'Matt', level: 9, kd: 4.4 },
  { name: 'Josh', level: 3, kd: 2.0 },
  { name: 'Tommy', level: 5, kd: 3.2 },
  { name: 'Aaron', level: 8, kd: 2.917 },
  { name: 'Panna', level: 10, kd: 2.75 },
  { name: 'Andrew', level: 14, kd: 8.7 },
  { name: 'Matt', level: 13, kd: 3.316 },
  { name: 'Tommy', level: 12, kd: 7.0 },
  { name: 'Aaron', level: 9, kd: 3.0 },
  { name: 'Panna', level: 13, kd: 3.235 },
  { name: 'Andrew', level: 19, kd: 7.733 },
  { name: 'Matt', level: 16, kd: 3.417 },
  { name: 'Panna', level: 14, kd: 3.5 },
  { name: 'Andrew', level: 20, kd: 7.294 },
  { name: 'Matt', level: 17, kd: 3.296 },
  { name: 'Tommy', level: 13, kd: 5.692 },
  { name: 'Aaron', level: 10, kd: 2.647 },
  { name: 'Panna', level: 16, kd: 3.81 },
  { name: 'Matt', level: 18, kd: 3.357 },
  { name: 'Tommy', level: 14, kd: 5.929 },
  { name: 'Aaron', level: 11, kd: 2.882 },
  { name: 'Panna', level: 16, kd: 3.636 },
  { name: 'Andrew', level: 21, kd: 7.5 },
  { name: 'Matt', level: 19, kd: 3.586 },
  { name: 'Tommy', level: 15, kd: 6.235 },
  { name: 'Andrew', level: 22, kd: 6.9 },
  { name: 'Matt', level: 20, kd: 3.452 },
  { name: 'Tommy', level: 16, kd: 5.632 },
  { name: 'Panna', level: 18, kd: 3.68 },
  { name: 'Matt', level: 22, kd: 3.618 },
  { name: 'Aaron', level: 23, kd: 3.083 },
  { name: 'Panna', level: 25, kd: 4.067 },
  { name: 'Andrew', level: 23, kd: 6.591 },
  { name: 'Nick', level: 6, kd: 6.5 },
  { name: 'Matt', level: 26, kd: 3.78 },
  { name: 'Tommy', level: 25, kd: 6.033 },
  { name: 'Panna', level: 27, kd: 3.667 },
  { name: 'Nick', level: 10, kd: 3.333 },
  { name: 'Matt', level: 31, kd: 3.638 },
  { name: 'Josh', level: 7, kd: 7.0 },
  { name: 'Tommy', level: 28, kd: 5.853 },
  { name: 'Panna', level: 29, kd: 3.405 },
  { name: 'Nick', level: 13, kd: 2.857 },
  { name: 'Matt', level: 33, kd: 3.453 },
  { name: 'Josh', level: 8, kd: 5.0 },
  { name: 'Aaron', level: 25, kd: 3.128 },
  { name: 'Panna', level: 31, kd: 3.667 },
  { name: 'Nick', level: 14, kd: 3.125 },
  { name: 'Matt', level: 35, kd: 3.5 },
  { name: 'Tommy', level: 29, kd: 6.176 },
  { name: 'Aaron', level: 9, kd: 2.562 },
  { name: 'Panna', level: 15, kd: 3.3 },
  { name: 'Matt', level: 16, kd: 3.52 },
  { name: 'Aaron', level: 11, kd: 2.789 },
  { name: 'Tommy', level: 17, kd: 5.6 },
  { name: 'Josh', level: 36, kd: 5.239 },
  { name: 'Tommy', level: 31, kd: 5.784 },
  { name: 'Aaron', level: 28, kd: 2.959 },
  { name: 'Panna', level: 31, kd: 3.739 },
  { name: 'Andrew', level: 30, kd: 5.69 },
  { name: 'Nick', level: 17, kd: 2.615 },
  { name: 'Matt', level: 38, kd: 3.292 },
  { name: 'Aaron', level: 33, kd: 3.115 },
  { name: 'Nick', level: 20, kd: 2.75 },
  { name: 'Matt', level: 42, kd: 3.309 },
  { name: 'Josh', level: 20, kd: 3.571 },
  { name: 'Tommy', level: 36, kd: 5.128 },
  { name: 'Aaron', level: 37, kd: 3.1 },
  { name: 'Panna', level: 34, kd: 3.837 },
  { name: 'Andrew', level: 34, kd: 5.588 },
  { name: 'Matt', level: 43, kd: 3.296 },
  { name: 'Josh', level: 27, kd: 4.48 },
  { name: 'Tommy', level: 42, kd: 5.19 },
  { name: 'Panna', level: 37, kd: 3.554 },
  { name: 'Andrew', level: 37, kd: 5.5 },
  { name: 'Nick', level: 25, kd: 2.455 },
  { name: 'Matt', level: 44, kd: 3.274 },
  { name: 'Tommy', level: 45, kd: 5.426 },
  { name: 'Josh', level: 39, kd: 4.931 },
    { name: 'Aaron', level: 39, kd: 3.323 },
  { name: 'Panna', level: 41, kd: 3.463 },
  { name: 'Andrew', level: 38, kd: 5.325 },
  { name: 'Nick', level: 28, kd: 2.344 },
  { name: 'Matt', level: 48, kd: 3.144 },
  { name: 'Tommy', level: 45, kd: 5.426 },
  { name: 'Josh', level: 30, kd: 4.931 },
  { name: 'Aaron', level: 41, kd: 3.439 },
  { name: 'Panna', level: 45, kd: 3.383 },
  { name: 'Andrew', level: 44, kd: 4.98 },
  { name: 'Nick', level: 30, kd: 2.297 },
  { name: 'Matt', level: 51, kd: 3.115 },
  { name: 'Aaron', level: 46, kd: 3.451 },
  { name: 'Panna', level: 48, kd: 3.459 },
  { name: 'Andrew', level: 46, kd: 4.855 },
  { name: 'Nick', level: 36, kd: 2.419 },
  { name: 'Matt', level: 53, kd: 3.116 },
  { name: 'Aaron', level: 50, kd: 3.268 },
  { name: 'Panna', level: 57, kd: 3.294 },
  { name: 'Andrew', level: 55, kd: 4.935 },
  { name: 'Nick', level: 40, kd: 2.622 },
  { name: 'Matt', level: 60, kd: 3.211 },
  { name: 'Tommy', level: 53, kd: 5.479 },
  { name: 'Josh', level: 37, kd: 7.323 },
  { name: 'Aaron', level: 52, kd: 3.253 },
  { name: 'Panna', level: 59, kd: 3.448 },
  { name: 'Andrew', level: 58, kd: 5.094 },
  { name: 'Nick', level: 41, kd: 2.63 },
  { name: 'Matt', level: 66, kd: 3.348 },
  { name: 'Tommy', level: 57, kd: 5.59 },
  { name: 'Josh', level: 39, kd: 7.121 },
  { name: 'Aaron', level: 56, kd: 2.98 },
  { name: 'Panna', level: 61, kd: 3.316 },
  { name: 'Andrew', level: 63, kd: 4.73 },
  { name: 'Nick', level: 42, kd: 2.5 },
  { name: 'Matt', level: 69, kd: 3.36 },
  { name: 'Tommy', level: 60, kd: 5.386 },
  { name: 'Josh', level: 43, kd: 6.634 },
  { name: 'Aaron', level: 64, kd: 2.863 },
  { name: 'Panna', level: 73, kd: 3.252 },
  { name: 'Andrew', level: 63, kd: 4.73 },
  { name: 'Nick', level: 51, kd: 2.263 },
  { name: 'Matt', level: 76, kd: 3.303 },
  { name: 'Tommy', level: 61, kd: 5.314 },
  { name: 'Josh', level: 46, kd: 6.854 },
  { name: 'Aaron', level: 68, kd: 2.817 },
  { name: 'Panna', level: 77, kd: 3.333 },
  { name: 'Nick', level: 56, kd: 2.286 },
  { name: 'Matt', level: 82, kd: 3.308 },
  { name: 'Tommy', level: 63, kd: 5.375 },
  { name: 'Aaron', level: 74, kd: 2.773 },
  { name: 'Panna', level: 85, kd: 3.393 },
  { name: 'Andrew', level: 75, kd: 4.625 },
  { name: 'Nick', level: 71, kd: 2.53 },
  { name: 'Matt', level: 90, kd: 3.302 },
  { name: 'Tommy', level: 68, kd: 5.409 },

];

// Export the updated playerStatsForChart array
export default playerStatsForChart;

/*
Aaron 85 85 2.761 171
Panna 100 100 3.272 252
Andrew 88 88 4.532 132
Nick 86 86 2.617 135
Matt 104 104 3.265 281
Tommy 74 74 5.206 113
Josh 46 46 6.386 53

*/
  



/*const playerStatsForChart = [
  { name: 'Aaron', level: 98, kd: 2.563 },
  { name: 'Aaron', level: 99, kd: 2.573 },
  { name: 'Aaron', level: 100, kd: 2.564 },
  { name: 'Aaron', level: 102, kd: 2.557 },
  { name: 'Aaron', level: 104, kd: 2.523 },
  { name: 'Aaron', level: 105, kd: 2.518 },
  { name: 'Aaron', level: 108, kd: 2.551 },
  { name: 'Aaron', level: 109, kd: 2.565 },
  { name: 'Aaron', level: 111, kd: 2.637 },
  { name: 'Aaron', level: 114, kd: 2.661 },
  { name: 'Aaron', level: 115, kd: 2.65 },
  { name: 'Aaron', level: 122, kd: 2.728 },
  { name: 'Aaron', level: 123, kd: 2.714 },
  { name: 'Aaron', level: 125, kd: 2.681 },
  { name: 'Panna', level: 106, kd: 2.426 },
  { name: 'Panna', level: 107, kd: 2.449 },
  { name: 'Panna', level: 108, kd: 2.495 },
  { name: 'Panna', level: 110, kd: 2.512 },
  { name: 'Panna', level: 113, kd: 2.495 },
  { name: 'Panna', level: 113, kd: 2.516 },
  { name: 'Panna', level: 115, kd: 2.514 },
  { name: 'Panna', level: 118, kd: 2.551 },
  { name: 'Panna', level: 119, kd: 2.565 },
  { name: 'Panna', level: 119, kd: 2.566 },
  { name: 'Panna', level: 122, kd: 2.609 },
  { name: 'Panna', level: 123, kd: 2.628 },
  { name: 'Panna', level: 124, kd: 2.66 },
  { name: 'Panna', level: 127, kd: 2.664 },
  { name: 'Panna', level: 128, kd: 2.71 },
  { name: 'Panna', level: 128, kd: 2.709 },
  { name: 'Panna', level: 137, kd: 2.781 },
  { name: 'Panna', level: 139, kd: 2.754 },
  { name: 'Panna', level: 140, kd: 2.764 },
  { name: 'Panna', level: 142, kd: 2.828 },
  
  { name: 'Matt', level: 102, kd: 3.485 },
  { name: 'Matt', level: 102, kd: 3.483 },
  { name: 'Matt', level: 105, kd: 3.52 },
  { name: 'Matt', level: 106, kd: 3.558 },
  { name: 'Matt', level: 108, kd: 3.562 },
  { name: 'Matt', level: 110, kd: 3.561 },
  { name: 'Matt', level: 110, kd: 3.559 },
  { name: 'Matt', level: 112, kd: 3.532 },
  { name: 'Matt', level: 114, kd: 3.536 },
  { name: 'Matt', level: 116, kd: 3.549 },
  { name: 'Matt', level: 117, kd: 3.567 },
  { name: 'Matt', level: 120, kd: 3.544 },
  { name: 'Matt', level: 122, kd: 3.501 },
  { name: 'Matt', level: 122, kd: 3.516 },
  { name: 'Matt', level: 124, kd: 3.494 },
  { name: 'Matt', level: 130, kd: 3.501 },
  { name: 'Matt', level: 131, kd: 3.493 },
  { name: 'Matt', level: 134, kd: 3.456 },
  { name: 'Matt', level: 134, kd: 3.401 },
  { name: 'Matt', level: 137, kd: 3.483 },

  { name: 'Tommy', level: 32, kd: 3.188 },
  { name: 'Tommy', level: 33, kd: 3.212 },
  { name: 'Tommy', level: 35, kd: 3.206 },
  { name: 'Tommy', level: 38, kd: 3.27 },
  { name: 'Tommy', level: 44, kd: 3.31 },
  { name: 'Tommy', level: 46, kd: 3.409 },
  { name: 'Tommy', level: 49, kd: 3.383 },
  { name: 'Tommy', level: 52, kd: 3.408 },
  { name: 'Tommy', level: 54, kd: 3.549 },
  { name: 'Tommy', level: 54, kd: 3.569 },

  { name: 'Nick', level: 75, kd: 3.708 },
  { name: 'Nick', level: 79, kd: 3.667 },
  { name: 'Nick', level: 81, kd: 3.706 },
  { name: 'Nick', level: 87, kd: 3.689 },
  { name: 'Nick', level: 89, kd: 3.721 },
  { name: 'Nick', level: 91, kd: 3.64 },
  { name: 'Nick', level: 93, kd: 3.508 },
  { name: 'Nick', level: 94, kd: 3.468 },
  { name: 'Nick', level: 99, kd: 3.328 },
  { name: 'Nick', level: 99, kd: 3.279 },
  { name: 'Josh', level: 31, kd: 3.8 },
  { name: 'Josh', level: 33, kd: 4.244 },
  { name: 'Andrew', level: 28, kd: 3.261 },
*/

/* const playerStatsForChart = [
  { name: 'Nick', level: 5, kd: 3.333 },
  { name: 'Nick', level: 5, kd: 2.5 },
  { name: 'Nick', level: 6, kd: 3.667 },
  { name: 'Nick', level: 8, kd: 3.545 },
  { name: 'Nick', level: 8, kd: 3.385 },
  { name: 'Nick', level: 10, kd: 3.333 },
  { name: 'Nick', level: 14, kd: 3 },
  { name: 'Nick', level: 18, kd: 2.519 },
  { name: 'Nick', level: 23, kd: 2.235 },
  { name: 'Nick', level: 26, kd: 2.222 },
  { name: 'Nick', level: 27, kd: 2.421 },
  { name: 'Nick', level: 32, kd: 2.512 },
  { name: 'Nick', level: 38, kd: 2.605 },
  { name: 'Nick', level: 42, kd: 2.696 },
  { name: 'Matt', level: 5, kd: 7 },
  { name: 'Matt', level: 8, kd: 4.375 },
  { name: 'Matt', level: 9, kd: 4.2 },
  { name: 'Matt', level: 10, kd: 4.538 },
  { name: 'Matt', level: 11, kd: 4.571 },
  { name: 'Matt', level: 11, kd: 4.188 },
  { name: 'Matt', level: 13, kd: 3.789 },
  { name: 'Matt', level: 17, kd: 3.565 },
  { name: 'Matt', level: 21, kd: 2.968 },
  { name: 'Matt', level: 26, kd: 2.974 },
  { name: 'Matt', level: 26, kd: 2.923 },
  { name: 'Matt', level: 29, kd: 3 },
  { name: 'Matt', level: 30, kd: 3 },
  { name: 'Matt', level: 35, kd: 3 },
  { name: 'Matt', level: 39, kd: 2.94 },
  { name: 'Matt', level: 42, kd: 2.906 },
  { name: 'Matt', level: 47, kd: 3.053 },
  { name: 'Panna', level: 3, kd: 4.667 },
  { name: 'Panna', level: 5, kd: 4.333 },
  { name: 'Panna', level: 7, kd: 4.625 },
  { name: 'Panna', level: 8, kd: 4.7 },
  { name: 'Panna', level: 10, kd: 4.083 },
  { name: 'Panna', level: 13, kd: 3.5 },
  { name: 'Panna', level: 16, kd: 2.864 },
  { name: 'Panna', level: 17, kd: 2.714 },
  { name: 'Panna', level: 21, kd: 2.903 },
  { name: 'Panna', level: 28, kd: 3.057 },
  { name: 'Panna', level: 33, kd: 3.054 },
  { name: 'Panna', level: 36, kd: 3.098 },
  { name: 'Aaron', level: 2, kd: 4 },
  { name: 'Aaron', level: 4, kd: 3.75 },
  { name: 'Aaron', level: 4, kd: 2 },
  { name: 'Aaron', level: 5, kd: 2.2 },
  { name: 'Aaron', level: 8, kd: 2.214 },
  { name: 'Aaron', level: 13, kd: 1.727 },
  { name: 'Aaron', level: 17, kd: 1.724 },
  { name: 'Aaron', level: 20, kd: 1.774 },
  { name: 'Aaron', level: 21, kd: 2.091 },
  { name: 'Aaron', level: 25, kd: 2.111 },
  { name: 'Aaron', level: 29, kd: 2.15 },
  { name: 'Aaron', level: 34, kd: 2.143 },
  { name: 'Aaron', level: 37, kd: 2.152 },
  { name: 'Josh', level: 1, kd: 2 },
  { name: 'Josh', level: 6, kd: 6 },
  { name: 'Josh', level: 7, kd: 4 },
  { name: 'Tommy', level: 1, kd: 1 },
  { name: 'Tommy', level: 3, kd: 2.5 },
  { name: 'Andrew', level: 3, kd: 0.75 }
]
  */