# Geneerien CSV-mankeli

Viimesen päälle geneerinen mankeli sen vihon viimesen Excel-dokkarin
taistelemiseen oikeaan muotoon.

## Etsi ja korvaa

Sieltä pitää tietenkin etsiä ja korvata tietystä sarakkeesta tietty data
toisella, joka onnistuu seuraavilla syötteilä.

```
[sarake];[etsi];[korvaa]
```

tai

```
[sarake];%r:[regex];[korvaa]
```

Sääntöjä saa yhdistellä oman maun mukaan:

```
0;15;16
1;Björn;Nalle
4;%r:^(T|t).*;Korvattu
```

## Rivien yhdistäminen

Lisäksi voi iskeä into yhdistää kaksi tai useampi peräkkäinen rivi
yhdeksi tai vaihtoehtoisesti mankeloida jokaisen rivin sarakkeet eri
järjestykseen.

### Muokkaus ilman yhdistystä

Syöte

```
1;2
3;4
5;6
```

Yhdistettävät rivit: 1

Yhdistyssyöte

```
0.1;0.0
```

Tuloste

```
2;1
4;3
6;5
```

### Kahden peräkkäisen rivin yhdistäminen

Syöte

```
1;2
3;4
5;6
7;8
```

Yhdistettävät rivit: 2

Yhdistyssyöte

```
0.0;0.1;1.0;1.1
```

Tuloste

```
1;2;3;4
5;6;7;8
```

## Virheiden käsittely

Sitä ei ole.

