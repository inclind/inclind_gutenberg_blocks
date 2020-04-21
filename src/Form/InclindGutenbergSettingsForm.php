<?php

namespace Drupal\inclind_gutenberg_blocks\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\Yaml\Yaml;

/**
 * Class FacebookAuthSettingsForm.
 *
 * @package Drupal\inclind_gutenberg_blocks\Form
 */
class InclindGutenbergSettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'inclind_gutenberg_settings_form';
  }

  /**
   * {@inheritdoc}
   */
  public function getEditableConfigNames() {
    return [
      'inclind_gutenberg_blocks.settings',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('inclind_gutenberg_blocks.settings');

    $form['info'] = [
      '#type' => 'markup',
      '#markup' => '<p>You can copy <strong>inclind_gutenberg_blocks/scss/edit.scss</strong> file into your current
        theme (and compile it) to override default colors/fonts and some other presets within Inclind Gutenberg widgets.<br>This setting
        applies if destination file is of <strong>CSS</strong> type file only. </p>',
    ];

    $form['css_default_path'] = [
      '#type' => 'textfield',
      '#required' => FALSE,
      '#title' => $this->t('Override Default CSS'),
      '#default_value' => $config->get('css_default_path'),
      '#description' => $this->t('Provide a path to .CSS file (relative to your site default theme folder).'),
    ];

    $form['actions'] = [
      '#type' => 'actions',
      '#attributes' => ['class' => ['container-inline']],
    ];
    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Save settings'),
    ];

    //    $form['actions']['update_blocks'] = [
    //      '#type' => 'submit',
    //      '#value' => $this->t('Update Allowed GB Blocks'),
    //      '#submit' => ['::updateGBAllowedBlocks'],
    //      '#limit_validation_errors' => [],
    //      '#button_type' => 'primary',
    //    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $values = $form_state->getValues();
    $this->config('inclind_gutenberg_blocks.settings')
      ->set('css_default_path', $values['css_default_path'])
      ->save();

    parent::submitForm($form, $form_state);
  }

  /**
   * Submit handler for switching to the live version of the site.
   */
  public function updateGBAllowedBlocks(array &$form, FormStateInterface $form_state) {
    $config = \Drupal::service('config.factory')
      ->getEditable('gutenberg.settings');
    $blocks_settings = &drupal_static(__FUNCTION__);

    if (!isset($settings)) {
      $module_handler = \Drupal::service('module_handler');
      $path = $module_handler->getModule('inclind_gutenberg_blocks')->getPath();

      $file_path = DRUPAL_ROOT . '/' . $path . '/' . 'gutenberg.blocks.yml';
      if (file_exists($file_path)) {
        $file_contents = file_get_contents($file_path);
        $blocks_settings = Yaml::parse($file_contents);
      }
    }
    $data = $config->getRawData();
    if (!empty($blocks_settings) && $data) {
      foreach ($data as $i => $d) {
        if (stripos($i, '_allowed_blocks') === FALSE) {
          continue;
        }
        foreach ($blocks_settings['categories'] as $cat) {
          foreach ($cat['blocks'] as $b) {
            if (!isset($data[$b['id']])) {
              $data[$b['id']] = 0;
            }
          }
        }
      }
    }
  }
}
