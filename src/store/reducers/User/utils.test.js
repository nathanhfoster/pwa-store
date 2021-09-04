// https://github.com/marak/Faker.js/
import { deepClone } from 'utils';
import { mergeManifestWithForm, getManifestIconSrc, getManifestIconUrl } from './utils';
import { DEFAULT_STATE } from './reducer';

describe('User reducer utils', () => {
  describe('mergeManifestWithForm', () => {
    it('should merge the manifest found with lighthouse correclt with the Pwaform', () => {
      const newState = deepClone({
        ...DEFAULT_STATE,
        pwaToUpload: {
          ...DEFAULT_STATE.pwaToUpload,
          form: {
            ...DEFAULT_STATE.pwaToUpload.form,
            url: { ...DEFAULT_STATE.pwaToUpload.form.url, value: 'https://pwa.com/' },
            tags: { ...DEFAULT_STATE.pwaToUpload.form.tags, options: [{ name: 'Themed' }, { name: 'Offline' }] }
          }
        }
      });
      const { form } = newState.pwaToUpload;
      const manifestUrl = 'https://pwa.com/manifest.json';
      const imageThatIsMaskable = {
        src: 'assets/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      };
      const manifestJson = {
        manifest_version: 3,
        version: '3.0.0',
        version_name: '1.0.0 beta',
        name: 'Pwa Store',
        short_name: 'Pwa Store',
        description: 'Discover the future of progressive web apps even while offline',
        keywords: ['react', 'redux', 'pwa', 'store', 'free', 'django', 'themed'],
        categories: ['tools', 'store', 'free'],
        icons: [
          {
            src: 'assets/android-chrome-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: 'assets/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          imageThatIsMaskable,
          {
            src: 'assets/icon.png',
            sizes: '1500x1500',
            type: 'image/png'
          }
        ]
      };
      const result = mergeManifestWithForm(form, manifestUrl, manifestJson);
      const expected = {
        ...form,
        name: { ...form.name, value: 'Pwa Store' },
        slug: { ...form.slug, value: 'pwa-store', placeholder: 'pwa-store' },
        description: { ...form.description, value: manifestJson.description },
        tags: { ...form.tags, value: [{ name: 'Themed' }, { name: 'Offline' }] },
        manifest_url: {
          ...form.manifest_url,
          placeholder: manifestUrl,
          value: manifestUrl
        },
        manifest_json: { ...form.manifest_json, value: JSON.stringify(manifestJson) },
        image_url: {
          ...form.image_url,
          value: { ...form.image_url.value, src: `${form.url.value}${imageThatIsMaskable.src}` },
          options: manifestJson.icons.map(({ src }) => ({
            src: `https://pwa.com/${src}`
          }))
        }
      };
      expect(result).toMatchObject(expected);
    });
  });

  describe('getManifestIconSrc', () => {
    it('should replace the manifest.json in the manifest_url when the icon src is relative', () => {
      const manifest_url = 'https://pwa.com/assets/manifest.json';

      const icons = [
        {
          src: 'android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'android-chrome-384x384.png',
          sizes: '384x384',
          type: 'image/png'
        },
        {
          src: 'android-chrome-256x256.png',
          sizes: '256x256',
          type: 'image/png'
        },
        {
          src: 'android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'android-chrome-144x144.png',
          sizes: '144x144',
          type: 'image/png'
        },
        {
          src: 'android-chrome-96x96.png',
          sizes: '96x96',
          type: 'image/png'
        },
        {
          src: 'android-chrome-72x72.png',
          sizes: '72x72',
          type: 'image/png'
        },
        {
          src: 'android-chrome-48x48.png',
          sizes: '48x48',
          type: 'image/png'
        },
        {
          src: 'android-chrome-36x36.png',
          sizes: '36x36',
          type: 'image/png'
        }
      ];

      const result = getManifestIconSrc(manifest_url, icons);
      const expected = 'https://pwa.com/assets/android-chrome-512x512.png';

      expect(result).toBe(expected);
    });
  });

  describe('getManifestIconUrl', () => {
    it('Should return the right result', () => {
      const manifest_url = 'https://xtreemze.github.io/defend/./site.webmanifest';
      const icon = { src: 'android-chrome-512x512.png' };
      const result = getManifestIconUrl(manifest_url, icon);
      expect(result).toBe('https://xtreemze.github.io/defend/android-chrome-512x512.png');
    });
  });
});
