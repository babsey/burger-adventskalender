<template>
  <div class="about">
    <v-container class="text-justify">
      <h2>Impressum</h2>

      <v-card variant="text" max-width="1000">
        <v-card variant="text">
          <v-card-title v-text="'Wie funktioniert es?'" />

          <v-card-text>
            <p class="my-2">
              An jedem Tag (1.12. - 22.12.) öffnet sich um 17.15 Uhr ein Fenster
              in Burg-Birkenhof mit einer Überraschung für alle, die kommen. Die
              Fenster, an denen eine Aktion stattfindet sollten mit dem
              entsprechenden Datum versehen und ein wenig geschmückt sein. Dann
              können die Familien auch durch das Dorf laufen und Fenster
              entdecken.
            </p>
            <p class="my-2">
              Aktionen können z.b. sein: Lied(er) singen, eine Geschichte
              vorlesen oder vorspielen, adventliches Gebäck oder Getränk, eine
              kleine Bastelaktion usw. - alles, was euch einfällt und Licht in
              unser Dorf und unsere Herzen bringt.
            </p>
            <p class="my-2">
              Für Familien, die nicht in Burg-Birkenhof wohnen, aber gerne eine
              Fenster-Aktion gestalten wollen, gibt es die Möglichkeit, dies an
              einem öffentlichen Ort (Burger Platz, Kindi-Wiese, ...) zu machen,
              oder sich mit jemandem in Burg zusammenzutun.
            </p>
            <p class="my-2">
              Gerne dürfen auch alle mitmachen, die keine Kinder im Burger
              Kinderhaus haben.
            </p>
          </v-card-text>
        </v-card>

        <v-card variant="text">
          <v-card-title v-text="'Wer hat die Seite erstellt?'" />

          <v-card-text>
            Die Seite ist durch eine ehrenamliche Arbeit des Elternbeirats vom
            Burger Kinderhaus entwickelt worden.
          </v-card-text>
        </v-card>

        <v-card variant="text">
          <v-card-title v-text="'Mediennachweis'" />

          <v-card-text>
            Die Bilder und das Video (im Hintergrund) wurden von der Seite
            <a
              href="https://pixabay.com"
              target="_blank"
              v-text="'https://pixabay.com'"
            />
            sowie das Favicon von der Seite
            <a
              href="https://icon-icons.com"
              target="_blank"
              v-text="'https://icon-icons.com'"
            />
            entnommen.
          </v-card-text>
        </v-card>

        <v-card variant="text">
          <v-card-title v-text="'Datenschutzerklärung'" />

          <v-card-text>
            <p class="my-2">
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen
              Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
              vertraulich und entsprechend der gesetzlichen
              Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>

            <p class="my-2">
              Die Nutzung unserer Webseite ist in der Regel ohne Angabe
              personenbezogener Daten möglich. Soweit auf unseren Seiten
              personenbezogene Daten (beispielsweise Name, Anschrift oder
              E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich,
              stets auf freiwilliger Basis. Diese Daten werden ohne Ihre
              ausdrückliche Zustimmung nicht an Dritte weitergegeben.
            </p>

            <p class="my-2">
              Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B.
              bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen
              kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch
              Dritte ist nicht möglich. Die Hardware- und
              Software-Infrastruktur, die wir verwenden, ist jedoch mit
              branchenüblichen und regelmäßig aktualisierten
              Sicherheitsmaßnahmen versehen.
            </p>
          </v-card-text>
        </v-card>

        <v-card variant="text">
          <v-card-title v-text="'Wo finde ich die Lizenz der Seite?'" />

          <v-card-text>
            Die Seite ist ein Open-Source-Software (OSS) und der MIT-Lizenz.
            Mehr Information finden Sie unter
            <a
              href="https://github.com/babsey/burger-adventskalender"
              target="_blank"
              v-text="'https://github.com/babsey/burger-adventskalender'"
            />.
          </v-card-text>
        </v-card>
      </v-card>
    </v-container>
  </div>
</template>
