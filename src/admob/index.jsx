import { AdMob,  AdLoadInfo, InterstitialAdPluginEvents } from '@capacitor-community/admob';

export async function interstitial(){
  AdMob.addListener(InterstitialAdPluginEvents.Loaded, (info) => {
    console.log('siap')
  });

  const options = {
    adId: 'ca-app-pub-7614489014916537/7725064979',
    // isTesting: true
    // npa: true
  };
  await AdMob.prepareInterstitial(options);
  await AdMob.showInterstitial();
}
