
-- --------------------------------------------------------



-- --------------------------------------------------------

--
-- 表的结构 `t_sortable`
--

CREATE TABLE `t_sortable` (
  `id` int(11) NOT NULL,
  `path` varchar(255) DEFAULT NULL COMMENT '页面地址',
  `name` varchar(255) DEFAULT NULL COMMENT '页面名称',
  `sortable` text NOT NULL,
  `type` varchar(255) DEFAULT NULL COMMENT '页面的类型',
  `page_name` varchar(255) DEFAULT NULL COMMENT '页面标题',
  `page_background_color` varchar(255) DEFAULT NULL COMMENT '页面背景颜色'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `t_sortable`
--

INSERT INTO `t_sortable` (`id`, `path`, `name`, `sortable`, `type`, `page_name`, `page_background_color`) VALUES
(1000, '/h5/', 'index', '{\"id\":\"sort-1\",\"level\":1,\"child\":[{\"sorts\":\"st-button\",\"name\":\"按钮\",\"img_url\":\"/img/st-button.b7626e7e.png\",\"type\":[\"index\",\"cover\",\"article\",\"article_list\",\"pic_list\",\"us\"],\"button_text\":\"\",\"theme_type\":\"error\",\"button_size\":\"mini\",\"button_shape\":\"square\",\"button_plain\":\"false\",\"unique\":1610789322},{\"sorts\":\"st-input\",\"name\":\"输入框\",\"img_url\":\"data:image/png;base64,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\",\"type\":[\"index\",\"cover\",\"article\",\"article_list\",\"pic_list\",\"us\"],\"input_type\":\"text\",\"default_value\":\"\",\"placeholder\":\"\",\"unique\":1610794355},{\"sorts\":\"st-notice\",\"name\":\"公告\",\"img_url\":\"/img/st-notice.9c167792.png\",\"type\":[\"index\",\"cover\",\"article\",\"article_list\",\"pic_list\",\"us\"],\"theme_type\":\"error\",\"notice_scroll\":\"vertical\",\"notice_join\":\"true\",\"notice_speed\":\"160\",\"notice_volume_icon\":\"true\",\"unique\":1610945166},{\"sorts\":\"st-input\",\"name\":\"输入框\",\"placeholder\":\"\",\"default_value\":\"\",\"img_url\":\"data:image/png;base64,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\",\"type\":[\"index\",\"cover\",\"article\",\"article_list\",\"pic_list\",\"us\"],\"unique\":1610780380}],\"disable\":false}', 'index', '自定义首页', '#F9FBFB');


-- --------------------------------------------------------

--
-- 表的结构 `t_system_config`
--

CREATE TABLE `t_system_config` (
  `id` int(11) NOT NULL,
  `page_theme` varchar(255) DEFAULT NULL COMMENT '页面主题'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `t_system_config`
--

INSERT INTO `t_system_config` (`id`, `page_theme`) VALUES
(1, '#0f0');

-- --------------------------------------------------------



--
-- 转储表的索引
--

--
-- 表的索引 `t_sortable`
--
ALTER TABLE `t_sortable`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `t_system_config`
--
ALTER TABLE `t_system_config`
  ADD PRIMARY KEY (`id`);


--
-- 在导出的表使用AUTO_INCREMENT
--


--
-- 使用表AUTO_INCREMENT `t_sortable`
--
ALTER TABLE `t_sortable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1010;

--
-- 使用表AUTO_INCREMENT `t_system_config`
--
ALTER TABLE `t_system_config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;



