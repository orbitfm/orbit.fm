const { DateTime } = require('luxon');
const humanizeList = require('humanize-list');

const removeScheme = url => url.replace(/^https?:\/\//, '');

const serializePodcastFeed = ({ podcast, siteMetadata }) =>
  podcast.episode
    ? podcast.episode
        .sort((a, b) => {
          if (a.publicationDate > b.publicationDate) {
            return -1;
          }
          if (b.publicationDate > a.publicationDate) {
            return 1;
          }
          return 0;
        })
        .map(episode => ({
          title: `${episode.podcast.name} ${episode.name}`,
          description:
            episode.shortDescription || `Episode ${episode.episodeNumber}`,
          url: `${siteMetadata.siteUrl}/${episode.fields.path}`,
          guid: episode.id,
          author: episode.hosts.map(h => h.name, {
            oxfordComma: true,
          }),
          enclosure: {
            url: `${
              process.env.PODCAST_REDIRECT_URL
                ? removeScheme(process.env.PODCAST_REDIRECT_URL)
                : ''
            }${episode.audioUrl}`,
            length: `${episode.audioLength}`,
            type: 'audio/mp3',
          },
          custom_elements: [
            {
              pubDate: DateTime.fromISO(episode.publicationDate).toHTTP(),
            },
            {
              'itunes:author': humanizeList(
                episode.hosts.map(h => h.name, { oxfordComma: true })
              ),
            },
            {
              'itunes:subtitle': episode.shortDescription,
            },
            {
              'itunes:summary': episode.shortDescription,
            },
            {
              'content:encoded': `<p>${episode.shortDescription}</p>${
                episode.fields ? episode.fields.showNotesFormatted : ``
              }`,
            },
            { 'itunes:explicit': 'clean' },
            {
              'itunes:image': {
                _attr: {
                  href: episode.image
                    ? `https:${episode.image.file.url}`
                    : episode.podcast.image
                    ? `https:${episode.podcast.image.file.url}`
                    : ``,
                },
              },
            },
            { 'itunes:duration': episode.duration },
          ],
        }))
    : [];

module.exports = serializePodcastFeed;
