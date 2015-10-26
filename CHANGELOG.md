# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased][unreleased]
### Changed

## [0.1.1] - 2015-09-23
### Changed
- improvements to advanceWith, fixed bug advancing after a CSV end
- CSV end event has been simplified, advanceWith check moved into checkActionable and not inside papaComplete
- got rid of VSI transform 1.0s (to give faster feedback according to Gordon)
- fix to huge bug with multiple csvs and sequential playing
- interval declaration inside papaComplete is now moved inside inner anonymous function
- csv indices are attacahed to papaconfig so that they are pushed in the appropriate order instead of the first csv being parsed

### Added
- advanceWith now can have an array of types and indices
- papaCueEnd + papaCuePause to be able to execute custom functions on those actions of the CSV

## [0.0.1] - 2015-09-19
### Added
- This CHANGELOG file to keep track of versioning and changes to the library
- Ability to disable/enable btns/hlights (haven't tested how this affects quizzes)
- events: correctAdvance, wrongAdvance, playAltIndex, contentNext, slideEnd, altEnd, nextMedia

### Changed
- changed bootstrap approach to instruments
- activeIndex to be mediaActiveIndex and contentActiveIndex respectively (seems succcessful)
- next event

[0.1.1]: https://github.com/CDOT-EDX/Project/commit/2f13cf3722783c07914e454d8fbb369279f019ad
[0.0.1]: https://github.com/CDOT-EDX/Project/commit/9a3841a874c4a8824a0eaf3c905af172c753d3ef