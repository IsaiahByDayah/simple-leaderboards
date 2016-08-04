# simple-leaderboards
A simple leaderboards implementation for use in Game Jams and other non-official events.
## Note
The purpose of this project is to get quick and dirty leaderboards up and running in a project.
Security, stability, and usability are NOT top priority...
# Usage
The two exposed API endpoints are [POST]/API/Scores and [GET]/API/Scores/{game title}
## Format
To post a new score you pust include the following data:
- game [String - name of game score is to be filed under]
- value [String - score value]
- user [String - name to be associated with the score]

### NOTE
The scores are always retrieved in descending order (highest to lowest) so in the event of smaller scores being better (ie: golf, time trials, etc) submit the negative of the values and use the positive value when displayed
