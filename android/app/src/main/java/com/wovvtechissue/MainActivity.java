package com.wovvtechissue;

import android.content.Intent;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "WovvtechIssue";
  }

  @Override
  protected void onResume() {
    super.onResume();
    startService(new Intent(this, LocationService.class));
  }
}
