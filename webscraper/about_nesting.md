# nesting levels

To allow SQL databases to contiguously store every course's prerequisites,
a schema for converting nested structures into multi-line structures is needed.
Prerequisites contain the following three fields at minimum:
1. Course ID
2. Minimum passing grade
    - These two are self-explanatory
3. Nesting index

This is where things get complex.

The nesting index is defined as a level of parenthesization combined with a 
chirality of Boolean binary operator.

The two basic operators used to make the process as close to the on-site
prerequisite hierarchy are AND and OR. The following indices are defined as
base case:
## (termination): 0
This is to reduce complexity of indexing the block
## AND: 1
For instance:
```
    ID		MPG	NST
    ...
    ABCD123 B+  01
    FGHJ456 B+  00
    ...
```
indicates `(ABCD123 min. B+ AND FGHJ456 min. B+)`, that both a B+ in course 
ABCD123 and a B+ in course FGHJ456 are the only prerequisites needed for a 
given course.
## OR: 2
For instance:
```
    ID		MPG	NST
    ...
    ABCD123 B+  02
    FGHJ456 B+  00
    ...
```
indicates `(ABCD123 min. B+ OR FGHJ456 min. B+)`, that either a B+ in course 
ABCD123 or a B+ in course FGHJ456 is necessary to enter the course.

Incrementing the value by two adds another layer of parenthesization,
increasing the maximum level of nesting depth to 2^(62) parentheses on most
modern machines.
The following is a modelling of a more complex prerequisite, for CHEM 204:
```
    ID      MPG NST Represents:
    ...             
                                    (
    CHEM201 D-  01  CHEM201 min. D- AND (
    BIOL101 D-  02      BIOL101 min. D- OR (
    BIOL103 D-  03          BIOL103 min. D- AND
    BIOL123 D-  01          BIOL123 min. D- )
                                        ) 
                                    AND (
    BIOL102 D-  02      BIOL102 min. D- OR (
    BIOL104 D-  03          BIOL104 min. D- AND
    BIOL124 D-  03          BIOL124 min. D- AND
    CHEM203 D-  00          CHEM203 min. D- )
                                         )
                                     )
    ...
```
Note the indentation differences and their correspondences to the number used.

