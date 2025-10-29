const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  ChannelType,
} = require("discord.js");
const Database = require("../../utils/database");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("config")
    .setDescription("⚙️ Configure server settings")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommandGroup((group) =>
      group
        .setName("ai")
        .setDescription("Configure AI Assistant settings")
        .addSubcommand((subcommand) =>
          subcommand
            .setName("enable")
            .setDescription("Enable AI Assistant for the server")
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName("disable")
            .setDescription("Disable AI Assistant for the server")
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName("mode")
            .setDescription("Set AI Assistant mode")
            .addStringOption((option) =>
              option
                .setName("mode")
                .setDescription("AI mode to use")
                .setRequired(true)
                .addChoices(
                  { name: "🚫 Disabled - AI is completely off", value: "disabled" },
                  { name: "📝 Context - Only /aiassistant command (with FAQ context)", value: "context" },
                  { name: "🤖 Auto - Responds to questions in AI channels", value: "auto" },
                  { name: "🔀 Hybrid - Both command and auto-responses", value: "hybrid" }
                )
            )
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName("context")
            .setDescription("Set AI context/FAQ information")
            .addStringOption((option) =>
              option
                .setName("text")
                .setDescription("Context information for AI (server info, FAQ, etc.)")
                .setRequired(true)
                .setMaxLength(2000)
            )
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName("channel-add")
            .setDescription("Add a channel for AI auto-responses")
            .addChannelOption((option) =>
              option
                .setName("channel")
                .setDescription("Channel to add")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
            )
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName("channel-remove")
            .setDescription("Remove a channel from AI auto-responses")
            .addChannelOption((option) =>
              option
                .setName("channel")
                .setDescription("Channel to remove")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
            )
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName("channel-list")
            .setDescription("List all AI-enabled channels")
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName("channel-clear")
            .setDescription("Remove all channels from AI auto-responses")
        )
        .addSubcommand((subcommand) =>
          subcommand.setName("status").setDescription("View current AI configuration")
        )
    ),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const db = await Database.getInstance();
    const subcommandGroup = interaction.options.getSubcommandGroup();
    const subcommand = interaction.options.getSubcommand();

    if (subcommandGroup !== "ai") {
      return await interaction.editReply({
        content: "❌ Invalid subcommand group.",
      });
    }

    try {
      switch (subcommand) {
        case "enable":
          await handleEnable(interaction, db);
          break;
        case "disable":
          await handleDisable(interaction, db);
          break;
        case "mode":
          await handleMode(interaction, db);
          break;
        case "context":
          await handleContext(interaction, db);
          break;
        case "channel-add":
          await handleChannelAdd(interaction, db);
          break;
        case "channel-remove":
          await handleChannelRemove(interaction, db);
          break;
        case "channel-list":
          await handleChannelList(interaction, db);
          break;
        case "channel-clear":
          await handleChannelClear(interaction, db);
          break;
        case "status":
          await handleStatus(interaction, db);
          break;
        default:
          await interaction.editReply({
            content: "❌ Unknown subcommand.",
          });
      }
    } catch (error) {
      console.error("Error in /config ai command:", error);
      await interaction.editReply({
        content: "❌ An error occurred while updating AI configuration.",
      });
    }
  },
};

// 🟢 Enable AI Assistant
async function handleEnable(interaction, db) {
  await db.updateServerConfig(interaction.guild.id, {
    aiEnabled: true,
  });

  const embed = new EmbedBuilder()
    .setColor("#00ff00")
    .setTitle("✅ AI Assistant Enabled")
    .setDescription(
      "AI Assistant has been enabled for this server!\n\n" +
        "**Next Steps:**\n" +
        "1. Set AI mode: `/config ai mode`\n" +
        "2. Add AI channels: `/config ai channel-add`\n" +
        "3. Set context (optional): `/config ai context`"
    )
    .setFooter({
      text: "Use /config ai status to view current configuration",
    })
    .setTimestamp();

  await interaction.editReply({ embeds: [embed] });
}

// 🔴 Disable AI Assistant
async function handleDisable(interaction, db) {
  await db.updateServerConfig(interaction.guild.id, {
    aiEnabled: false,
    aiMode: "disabled",
  });

  const embed = new EmbedBuilder()
    .setColor("#ff0000")
    .setTitle("🔴 AI Assistant Disabled")
    .setDescription(
      "AI Assistant has been disabled for this server.\n\n" +
        "All AI features including auto-responses and `/aiassistant` command will be unavailable."
    )
    .setFooter({
      text: "Use /config ai enable to re-enable AI Assistant",
    })
    .setTimestamp();

  await interaction.editReply({ embeds: [embed] });
}

// 🔧 Set AI Mode
async function handleMode(interaction, db) {
  const mode = interaction.options.getString("mode");

  await db.updateServerConfig(interaction.guild.id, {
    aiMode: mode,
    aiEnabled: mode !== "disabled",
  });

  const modeDescriptions = {
    disabled: {
      title: "🚫 AI Mode: Disabled",
      description: "AI Assistant is completely turned off.",
      color: "#ff0000",
    },
    context: {
      title: "📝 AI Mode: Context Only",
      description:
        "AI responds only to `/aiassistant` command.\n" +
        "FAQ context will be used when available.",
      color: "#ffaa00",
    },
    auto: {
      title: "🤖 AI Mode: Auto-Response",
      description:
        "AI automatically responds to questions in configured channels.\n\n" +
        "**Requirements:**\n" +
        "• Add channels using `/config ai channel-add`\n" +
        "• Messages must look like questions\n" +
        "• Rate limited to 5 requests per 10 minutes per user",
      color: "#00aaff",
    },
    hybrid: {
      title: "🔀 AI Mode: Hybrid",
      description:
        "AI works in both ways:\n" +
        "• Responds to `/aiassistant` command\n" +
        "• Auto-responds in configured channels\n\n" +
        "This provides the most flexible AI experience!",
      color: "#aa00ff",
    },
  };

  const modeInfo = modeDescriptions[mode];

  const embed = new EmbedBuilder()
    .setColor(modeInfo.color)
    .setTitle(modeInfo.title)
    .setDescription(modeInfo.description)
    .setFooter({
      text: "Use /config ai status to view full configuration",
    })
    .setTimestamp();

  await interaction.editReply({ embeds: [embed] });
}

// 📝 Set AI Context
async function handleContext(interaction, db) {
  const context = interaction.options.getString("text");

  await db.updateServerConfig(interaction.guild.id, {
    aiContext: context,
  });

  const embed = new EmbedBuilder()
    .setColor("#00ff00")
    .setTitle("✅ AI Context Updated")
    .setDescription(
      "AI context has been set successfully!\n\n" +
        "**Preview:**\n" +
        "```\n" +
        (context.length > 500 ? context.substring(0, 500) + "..." : context) +
        "\n```\n\n" +
        "The AI will use this information to provide better, server-specific responses."
    )
    .setFooter({
      text: `Context length: ${context.length}/2000 characters`,
    })
    .setTimestamp();

  await interaction.editReply({ embeds: [embed] });
}

// ➕ Add AI Channel
async function handleChannelAdd(interaction, db) {
  const channel = interaction.options.getChannel("channel");
  const config = await db.getServerConfig(interaction.guild.id);

  // Initialize aiChannels if it doesn't exist
  const currentChannels = config.aiChannels || [];

  if (currentChannels.includes(channel.id)) {
    const embed = new EmbedBuilder()
      .setColor("#ffaa00")
      .setTitle("⚠️ Channel Already Added")
      .setDescription(`${channel} is already in the AI channels list.`)
      .setTimestamp();

    return await interaction.editReply({ embeds: [embed] });
  }

  currentChannels.push(channel.id);

  await db.updateServerConfig(interaction.guild.id, {
    aiChannels: currentChannels,
  });

  const embed = new EmbedBuilder()
    .setColor("#00ff00")
    .setTitle("✅ AI Channel Added")
    .setDescription(
      `${channel} has been added to AI channels!\n\n` +
        `**Total AI Channels:** ${currentChannels.length}\n\n` +
        "AI will now respond to questions in this channel " +
        "(if AI mode is set to 'auto' or 'hybrid')."
    )
    .setFooter({
      text: "Use /config ai channel-list to see all AI channels",
    })
    .setTimestamp();

  await interaction.editReply({ embeds: [embed] });
}

// ➖ Remove AI Channel
async function handleChannelRemove(interaction, db) {
  const channel = interaction.options.getChannel("channel");
  const config = await db.getServerConfig(interaction.guild.id);

  const currentChannels = config.aiChannels || [];

  if (!currentChannels.includes(channel.id)) {
    const embed = new EmbedBuilder()
      .setColor("#ffaa00")
      .setTitle("⚠️ Channel Not Found")
      .setDescription(`${channel} is not in the AI channels list.`)
      .setTimestamp();

    return await interaction.editReply({ embeds: [embed] });
  }

  const updatedChannels = currentChannels.filter((id) => id !== channel.id);

  await db.updateServerConfig(interaction.guild.id, {
    aiChannels: updatedChannels,
  });

  const embed = new EmbedBuilder()
    .setColor("#00ff00")
    .setTitle("✅ AI Channel Removed")
    .setDescription(
      `${channel} has been removed from AI channels!\n\n` +
        `**Remaining AI Channels:** ${updatedChannels.length}`
    )
    .setFooter({
      text: "Use /config ai channel-list to see remaining AI channels",
    })
    .setTimestamp();

  await interaction.editReply({ embeds: [embed] });
}

// 📋 List AI Channels
async function handleChannelList(interaction, db) {
  const config = await db.getServerConfig(interaction.guild.id);
  const channelIds = config.aiChannels || [];

  if (channelIds.length === 0) {
    const embed = new EmbedBuilder()
      .setColor("#ffaa00")
      .setTitle("📋 AI Channels")
      .setDescription(
        "No AI channels configured.\n\n" +
          "Use `/config ai channel-add` to add channels where AI should respond automatically."
      )
      .setTimestamp();

    return await interaction.editReply({ embeds: [embed] });
  }

  const channelList = channelIds
    .map((id) => {
      const channel = interaction.guild.channels.cache.get(id);
      return channel ? `• ${channel}` : `• <#${id}> *(channel not found)*`;
    })
    .join("\n");

  const embed = new EmbedBuilder()
    .setColor("#00aaff")
    .setTitle("📋 AI Channels")
    .setDescription(
      `**Total Channels:** ${channelIds.length}\n\n${channelList}\n\n` +
        "AI will respond to questions in these channels when mode is 'auto' or 'hybrid'."
    )
    .setFooter({
      text: "Use /config ai channel-add or channel-remove to modify",
    })
    .setTimestamp();

  await interaction.editReply({ embeds: [embed] });
}

// 🗑️ Clear All AI Channels
async function handleChannelClear(interaction, db) {
  const config = await db.getServerConfig(interaction.guild.id);
  const channelCount = (config.aiChannels || []).length;

  if (channelCount === 0) {
    const embed = new EmbedBuilder()
      .setColor("#ffaa00")
      .setTitle("⚠️ No Channels to Clear")
      .setDescription("There are no AI channels configured.")
      .setTimestamp();

    return await interaction.editReply({ embeds: [embed] });
  }

  await db.updateServerConfig(interaction.guild.id, {
    aiChannels: [],
  });

  const embed = new EmbedBuilder()
    .setColor("#00ff00")
    .setTitle("✅ AI Channels Cleared")
    .setDescription(
      `Removed ${channelCount} channel(s) from AI auto-responses.\n\n` +
        "AI will no longer respond automatically in any channels.\n" +
        "(The `/aiassistant` command will still work if enabled)"
    )
    .setFooter({
      text: "Use /config ai channel-add to add channels back",
    })
    .setTimestamp();

  await interaction.editReply({ embeds: [embed] });
}

// 📊 Show AI Status
async function handleStatus(interaction, db) {
  const config = await db.getServerConfig(interaction.guild.id);

  const statusEmoji = config.aiEnabled ? "🟢" : "🔴";
  const modeEmojis = {
    disabled: "🚫",
    context: "📝",
    auto: "🤖",
    hybrid: "🔀",
  };

  const channelIds = config.aiChannels || [];
  const channelList =
    channelIds.length > 0
      ? channelIds
          .slice(0, 10)
          .map((id) => {
            const channel = interaction.guild.channels.cache.get(id);
            return channel ? `• ${channel}` : `• <#${id}>`;
          })
          .join("\n")
      : "*No channels configured*";

  const moreChannels =
    channelIds.length > 10 ? `\n\n*...and ${channelIds.length - 10} more*` : "";

  const contextPreview = config.aiContext
    ? config.aiContext.substring(0, 200) + (config.aiContext.length > 200 ? "..." : "")
    : "*No context set*";

  const embed = new EmbedBuilder()
    .setColor(config.aiEnabled ? "#00ff00" : "#ff0000")
    .setTitle(`${statusEmoji} AI Assistant Configuration`)
    .setDescription(
      `**Status:** ${config.aiEnabled ? "✅ Enabled" : "❌ Disabled"}\n` +
        `**Mode:** ${modeEmojis[config.aiMode]} ${config.aiMode.charAt(0).toUpperCase() + config.aiMode.slice(1)}`
    )
    .addFields(
      {
        name: "📝 AI Context",
        value: `\`\`\`\n${contextPreview}\n\`\`\``,
        inline: false,
      },
      {
        name: `🗨️ AI Channels (${channelIds.length})`,
        value: channelList + moreChannels,
        inline: false,
      },
      {
        name: "⚙️ Mode Descriptions",
        value:
          "**Disabled:** AI is off\n" +
          "**Context:** `/aiassistant` command only\n" +
          "**Auto:** Responds in configured channels\n" +
          "**Hybrid:** Both command and auto-response",
        inline: false,
      }
    )
    .setFooter({
      text: "Use /config ai [subcommand] to modify settings",
    })
    .setTimestamp();

  await interaction.editReply({ embeds: [embed] });
}