# Grid Component
Grid that has 100 cells, 10 x 10, and shows where the boats are positioned, if the boat was hit, destroyed or if there is sea

## Props

+ **grid** Should get an array throught the prop "grid" with ten object like the following one:
{
  id: 1,
  status: 'empty',
  taken: false,
  cellContent: 'sea',
  content: 'cruisers-1',
}
+ **status** should be 'empty', 'hit', 'destroyed' or 'missed', it indicate the status and gives style
+ **taken** indicates if there is a ship in that cell
+ **cellContent** indicates the kind of content in that cell, for example 'cruisers-1-1' that it's the cell 1 of the cruicer 1
+ **taken** indicates if there is a ship in that cell