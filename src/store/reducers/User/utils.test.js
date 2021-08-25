// https://github.com/marak/Faker.js/
import { deepClone } from 'utils';
import { mergeManifestWithForm } from './utils';
import { DEFAULT_STATE } from './reducer';

describe('User reducer mergeManifestWithForm util', () => {
  it('should merge the manifest found with lighthouse correclt with the Pwaform', () => {
    const newState = deepClone({
      ...DEFAULT_STATE,
      pwaToUpload: {
        ...DEFAULT_STATE.pwaToUpload,
        form: {
          ...DEFAULT_STATE.pwaToUpload.form,
          url: { ...DEFAULT_STATE.pwaToUpload.form.url, value: 'https://pwa.com/' },
          tags: { ...DEFAULT_STATE.pwaToUpload.form.tags, options: ['Themed', 'Offline'] }
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
      description: 'Discover the future of progressive web apps',
      keywords: ['react', 'redux', 'pwa', 'store', 'free', 'django'],
      categories: ['tools', 'store', 'free', 'themed', 'offline'],
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
    const result = mergeManifestWithForm(newState, manifestUrl, manifestJson);
    const expected = {
      ...form,
      name: { ...form.name, value: 'Pwa Store' },
      slug: { ...form.slug, placeholder: 'pwa-store' },
      description: { ...form.description, value: manifestJson.description },
      tags: { ...form.tags, value: ['Themed', 'Offline'] },
      manifest_url: {
        ...form.manifest_url,
        placeholder: manifestUrl,
        value: manifestUrl,
        disabled: true
      },
      manifest_json: { ...form.manifest_json, value: manifestJson, disabled: true },
      image_url: { ...form.image_url, value: `${form.url.value}${imageThatIsMaskable.src}` }
    };
    expect(result).toMatchObject(expected);
  });
});
