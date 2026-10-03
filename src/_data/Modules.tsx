import {
  GitBranch,
  GitCommit,
  GitMerge,
  Settings,
  TerminalSquare,
  FolderGit2,
  History,
} from "lucide-react";
import { GitHubMark } from "../components/GitHubMark";
import type { Module } from "../types";

export const MODULES: Module[] = [
  // =========================================================
  // MODULE 1 — GIT SETUP & CONFIGURATION
  // =========================================================
  {
    id: "m1",
    title: "1. Git Setup & Configuration",
    description:
      "Install, verify, and configure Git before working with repositories.",
    icon: <Settings size={18} />,

    levels: [
      {
        id: "m1_l1",
        title: "Check Git Version",
        description:
          "Verify that Git is installed and available from your terminal.",
        concept:
          "Before using Git, your terminal needs access to the Git executable. Checking the version confirms Git is installed correctly and also tells you which version you are currently using.",

        tasks: [
          {
            id: "t_git_version",
            instruction: "Check the installed Git version.",
            hint: "Use 'git --version'",
            expected: /^git\s+--version$/,
            successMsg: "git version 2.51.0",
          },
        ],
      },

      {
        id: "m1_l2",
        title: "Configure Username",
        description: "Tell Git which name should appear on your commits.",
        concept:
          "Every Git commit stores author information. user.name defines the human-readable name attached to commits you create. Using --global makes the configuration apply to your user account across repositories.",

        tasks: [
          {
            id: "t_config_name",
            instruction: "Set your global Git username to 'Alex Developer'.",
            hint: "Use 'git config --global user.name \"Alex Developer\"'",
            expected:
              /^git\s+config\s+--global\s+user\.name\s+["']Alex Developer["']$/,
            successMsg: "Global Git username configured.",
          },
        ],
      },

      {
        id: "m1_l3",
        title: "Configure Email",
        description: "Configure the email stored with your Git commits.",
        concept:
          "Git stores an author email with each commit. GitHub can associate commits with your GitHub account when the commit email matches an email connected to that account.",

        tasks: [
          {
            id: "t_config_email",
            instruction: "Set your global Git email to 'alex@example.com'.",
            hint: "Use 'git config --global user.email \"alex@example.com\"'",
            expected:
              /^git\s+config\s+--global\s+user\.email\s+["']alex@example\.com["']$/,
            successMsg: "Global Git email configured.",
          },
        ],
      },

      {
        id: "m1_l4",
        title: "Inspect Configuration",
        description: "See the Git configuration currently applied.",
        concept:
          "Git configuration can come from multiple scopes such as system, global, and repository-local configuration. git config --list lets you inspect the effective configuration values Git knows about.",

        tasks: [
          {
            id: "t_config_list",
            instruction: "Display your Git configuration.",
            hint: "Use 'git config --list'",
            expected: /^git\s+config\s+--list$/,
            successMsg: "user.name=Alex Developer\nuser.email=alex@example.com",
          },
        ],
      },

      {
        id: "m1_l5",
        title: "Configure Default Branch",
        description:
          "Choose the default initial branch name for new repositories.",
        concept:
          "When Git initializes a new repository, it creates an initial branch. init.defaultBranch lets you configure the name Git should use for future repositories.",

        tasks: [
          {
            id: "t_default_branch",
            instruction:
              "Configure Git so new repositories use 'main' as the default branch.",
            hint: "Use 'git config --global init.defaultBranch main'",
            expected: /^git\s+config\s+--global\s+init\.defaultBranch\s+main$/,
            successMsg: "Default branch configured as 'main'.",
          },
        ],
      },
    ],
  },

  // =========================================================
  // MODULE 2 — REPOSITORY BASICS
  // =========================================================
  {
    id: "m2",
    title: "2. Repository Basics",
    description:
      "Create repositories and understand the Git working directory.",
    icon: <FolderGit2 size={18} />,

    levels: [
      {
        id: "m2_l1",
        title: "Initialize Repository",
        description: "Turn an ordinary directory into a Git repository.",
        concept:
          "git init creates Git's internal .git directory. That hidden directory contains repository metadata, references, configuration, objects, and history.",

        tasks: [
          {
            id: "t_init",
            instruction:
              "Initialize the current directory as a Git repository.",
            hint: "Use 'git init'",
            expected: /^git\s+init$/,
            successMsg:
              "Initialized empty Git repository in /home/user/project/.git/",
          },
        ],
      },

      {
        id: "m2_l2",
        title: "Check Repository Status",
        description: "Inspect the current state of your working directory.",
        concept:
          "git status is one of the commands you will use most often. It tells you which files are untracked, modified, staged, or ready to commit.",

        tasks: [
          {
            id: "t_status",
            instruction: "Check the status of the repository.",
            hint: "Use 'git status'",
            expected: /^git\s+status$/,
            successMsg:
              "On branch main\nUntracked files:\n  index.html\n  style.css",
          },
        ],
      },

      {
        id: "m2_l3",
        title: "Create a .gitignore",
        description: "Prevent generated or sensitive files from being tracked.",
        concept:
          ".gitignore contains patterns describing files Git should ignore when they are untracked. Typical examples include dependencies, build output, temporary files, IDE files, and environment files.",

        tasks: [
          {
            id: "t_gitignore",
            instruction: "Create a .gitignore file.",
            hint: "Use 'touch .gitignore'",
            expected: /^touch\s+\.gitignore$/,
            successMsg: ".gitignore created.",
          },

          {
            id: "t_gitignore_node_modules",
            instruction: "Add node_modules/ to .gitignore.",
            hint: "Use 'echo \"node_modules/\" >> .gitignore'",
            expected: /^echo\s+["']node_modules\/["']\s*>>\s*\.gitignore$/,
            successMsg: "node_modules/ will now be ignored.",
          },
        ],
      },

      {
        id: "m2_l4",
        title: "Clone a Repository",
        description: "Create a local copy of an existing remote repository.",
        concept:
          "git clone downloads the repository history and files, creates a working directory, and normally configures the source repository as a remote named origin.",

        tasks: [
          {
            id: "t_clone",
            instruction: "Clone https://github.com/example/project.git.",
            hint: "Use 'git clone https://github.com/example/project.git'",
            expected:
              /^git\s+clone\s+https:\/\/github\.com\/example\/project\.git$/,
            successMsg:
              "Cloning into 'project'...\nRepository cloned successfully.",
          },
        ],
      },
    ],
  },

  // =========================================================
  // MODULE 3 — STAGING & COMMITS
  // =========================================================
  {
    id: "m3",
    title: "3. Staging & Commits",
    description:
      "Move changes through Git's working tree, staging area, and commit history.",
    icon: <GitCommit size={18} />,

    levels: [
      {
        id: "m3_l1",
        title: "Stage One File",
        description: "Add a specific working-tree change to the staging area.",
        concept:
          "Git has a staging area between your working directory and commit history. git add copies the selected version of a file into that staging area for the next commit.",

        tasks: [
          {
            id: "t_add_file",
            instruction: "Stage index.html.",
            hint: "Use 'git add index.html'",
            expected: /^git\s+add\s+index\.html$/,
            successMsg: "index.html staged.",
          },
        ],
      },

      {
        id: "m3_l2",
        title: "Stage All Changes",
        description: "Stage multiple current changes at once.",
        concept:
          "git add . stages relevant changes underneath the current directory. git add -A stages changes across the working tree, including deletions.",

        tasks: [
          {
            id: "t_add_all",
            instruction: "Stage all current changes.",
            hint: "Use 'git add .'",
            expected: /^git\s+add\s+(\.|-A|--all)$/,
            successMsg: "All current changes staged.",
          },
        ],
      },

      {
        id: "m3_l3",
        title: "Unstage a File",
        description:
          "Remove a file from the staging area without deleting your work.",
        concept:
          "Sometimes you stage something accidentally. git restore --staged removes the staged version from the index while keeping your working-directory modifications.",

        tasks: [
          {
            id: "t_unstage",
            instruction: "Unstage style.css without discarding its changes.",
            hint: "Use 'git restore --staged style.css'",
            expected: /^git\s+restore\s+--staged\s+style\.css$/,
            successMsg:
              "style.css removed from staging. Working changes preserved.",
          },
        ],
      },

      {
        id: "m3_l4",
        title: "Create a Commit",
        description: "Save the staged snapshot into repository history.",
        concept:
          "A commit stores a snapshot of staged changes together with metadata including author, timestamp, parent commit, and commit message.",

        tasks: [
          {
            id: "t_commit",
            instruction:
              "Commit your staged changes with message 'Add homepage'.",
            hint: "Use 'git commit -m \"Add homepage\"'",
            expected: /^git\s+commit\s+-m\s+["']Add homepage["']$/,
            successMsg:
              "[main a1b2c3d] Add homepage\n2 files changed, 42 insertions(+)",
          },
        ],
      },

      {
        id: "m3_l5",
        title: "Commit Tracked Changes",
        description:
          "Stage modified tracked files and commit them in one command.",
        concept:
          "git commit -a automatically stages modified and deleted files that Git already tracks. It does not automatically add brand-new untracked files.",

        tasks: [
          {
            id: "t_commit_all",
            instruction:
              "Commit all modified tracked files with message 'Update styles'.",
            hint: "Use 'git commit -am \"Update styles\"'",
            expected: /^git\s+commit\s+-(am|a\s+-m)\s+["']Update styles["']$/,
            successMsg: "[main b2c3d4e] Update styles",
          },
        ],
      },

      {
        id: "m3_l6",
        title: "Amend Last Commit",
        description: "Modify the most recent commit.",
        concept:
          "git commit --amend replaces the most recent commit with a new commit. It is useful for correcting a message or adding forgotten staged changes. Because it rewrites commit history, use it carefully after sharing commits.",

        tasks: [
          {
            id: "t_amend",
            instruction:
              "Change the last commit message to 'Update homepage styles'.",
            hint: "Use 'git commit --amend -m \"Update homepage styles\"'",
            expected:
              /^git\s+commit\s+--amend\s+-m\s+["']Update homepage styles["']$/,
            successMsg:
              "[main c3d4e5f] Update homepage styles\nDate: ...\n2 files changed",
          },
        ],
      },
    ],
  },

  // =========================================================
  // MODULE 4 — INSPECTING CHANGES & HISTORY
  // =========================================================
  {
    id: "m4",
    title: "4. Inspecting Changes & History",
    description:
      "Understand what changed, when it changed, and who changed it.",
    icon: <History size={18} />,

    levels: [
      {
        id: "m4_l1",
        title: "View Unstaged Changes",
        description: "Inspect changes in your working tree.",
        concept:
          "git diff compares the working directory against the staging area. It shows modifications that have not yet been staged.",

        tasks: [
          {
            id: "t_diff",
            instruction: "Display unstaged changes.",
            hint: "Use 'git diff'",
            expected: /^git\s+diff$/,
            successMsg:
              "diff --git a/index.html b/index.html\n-Old text\n+New text",
          },
        ],
      },

      {
        id: "m4_l2",
        title: "View Staged Changes",
        description: "Inspect exactly what will enter the next commit.",
        concept:
          "git diff --staged compares the staging area against the current HEAD commit. This is an excellent final review before committing.",

        tasks: [
          {
            id: "t_diff_staged",
            instruction: "Display staged changes.",
            hint: "Use 'git diff --staged'",
            expected: /^git\s+diff\s+(--staged|--cached)$/,
            successMsg: "Showing changes staged for the next commit.",
          },
        ],
      },

      {
        id: "m4_l3",
        title: "View Commit History",
        description: "Inspect the repository's commit timeline.",
        concept:
          "git log walks through commit history and displays information such as commit hashes, authors, dates, and messages.",

        tasks: [
          {
            id: "t_log",
            instruction: "Display repository commit history.",
            hint: "Use 'git log'",
            expected: /^git\s+log$/,
            successMsg:
              "commit c3d4e5f...\nAuthor: Alex Developer\n\n    Update homepage styles",
          },
        ],
      },

      {
        id: "m4_l4",
        title: "Compact History",
        description: "Display a concise commit list.",
        concept:
          "git log --oneline compresses every commit into one line containing an abbreviated hash and commit message. This is useful for quickly navigating history.",

        tasks: [
          {
            id: "t_log_oneline",
            instruction: "Display commit history in compact one-line format.",
            hint: "Use 'git log --oneline'",
            expected: /^git\s+log\s+--oneline$/,
            successMsg:
              "c3d4e5f Update homepage styles\nb2c3d4e Add homepage\na1b2c3d Initial commit",
          },
        ],
      },

      {
        id: "m4_l5",
        title: "Inspect a Commit",
        description: "See metadata and changes belonging to one commit.",
        concept:
          "git show displays information about a Git object. When given a commit, it normally shows commit metadata and the patch introduced by that commit.",

        tasks: [
          {
            id: "t_show",
            instruction: "Inspect commit a1b2c3d.",
            hint: "Use 'git show a1b2c3d'",
            expected: /^git\s+show\s+a1b2c3d$/,
            successMsg: "Showing commit a1b2c3d and its changes.",
          },
        ],
      },

      {
        id: "m4_l6",
        title: "Compare Two Commits",
        description: "See the difference between two points in history.",
        concept:
          "git diff can compare commits directly. This is useful when reviewing what changed between releases, branches, or arbitrary historical snapshots.",

        tasks: [
          {
            id: "t_diff_commits",
            instruction: "Compare commit a1b2c3d with commit c3d4e5f.",
            hint: "Use 'git diff a1b2c3d c3d4e5f'",
            expected: /^git\s+diff\s+a1b2c3d\s+c3d4e5f$/,
            successMsg: "Showing changes between a1b2c3d and c3d4e5f.",
          },
        ],
      },

      {
        id: "m4_l7",
        title: "File History",
        description: "Inspect commits affecting a particular file.",
        concept:
          "git log can be limited to a particular path. This is useful when investigating when and why a specific file changed.",

        tasks: [
          {
            id: "t_file_history",
            instruction: "Show commit history for index.html.",
            hint: "Use 'git log -- index.html'",
            expected: /^git\s+log\s+--\s+index\.html$/,
            successMsg: "Showing commit history for index.html.",
          },
        ],
      },
    ],
  },

  // =========================================================
  // MODULE 5 — BRANCHING
  // =========================================================
  {
    id: "m5",
    title: "5. Branching",
    description:
      "Create independent lines of development and move between them safely.",
    icon: <GitBranch size={18} />,

    levels: [
      {
        id: "m5_l1",
        title: "List Branches",
        description: "See the branches available in your local repository.",
        concept:
          "Branches are movable references to commits. git branch lists local branches, and the current branch is normally marked with an asterisk.",

        tasks: [
          {
            id: "t_branch_list",
            instruction: "List your local Git branches.",
            hint: "Use 'git branch'",
            expected: /^git\s+branch$/,
            successMsg: "* main",
          },
        ],
      },

      {
        id: "m5_l2",
        title: "Create a Branch",
        description: "Create a new line of development.",
        concept:
          "Creating a branch creates a new reference pointing at a commit. It does not duplicate the entire repository.",

        tasks: [
          {
            id: "t_branch_create",
            instruction: "Create a branch named feature-login.",
            hint: "Use 'git branch feature-login'",
            expected: /^git\s+branch\s+feature-login$/,
            successMsg: "Branch 'feature-login' created.",
          },
        ],
      },

      {
        id: "m5_l3",
        title: "Switch Branch",
        description: "Move your working tree to another branch.",
        concept:
          "git switch changes the current branch and updates the working tree to match that branch's commit.",

        tasks: [
          {
            id: "t_branch_switch",
            instruction: "Switch to feature-login.",
            hint: "Use 'git switch feature-login'",
            expected: /^git\s+(switch|checkout)\s+feature-login$/,
            successMsg: "Switched to branch 'feature-login'",
          },
        ],
      },

      {
        id: "m5_l4",
        title: "Create and Switch",
        description: "Create a branch and move onto it in one operation.",
        concept:
          "git switch -c creates a new branch and immediately checks it out. The older equivalent is git checkout -b.",

        tasks: [
          {
            id: "t_switch_create",
            instruction: "Create and switch to a branch named feature-profile.",
            hint: "Use 'git switch -c feature-profile'",
            expected: /^git\s+(switch\s+-c|checkout\s+-b)\s+feature-profile$/,
            successMsg: "Switched to a new branch 'feature-profile'",
          },
        ],
      },

      {
        id: "m5_l5",
        title: "Rename a Branch",
        description: "Change the name of your current branch.",
        concept:
          "git branch -m renames a branch reference. This changes the local branch name but does not automatically rename an already-pushed remote branch.",

        tasks: [
          {
            id: "t_branch_rename",
            instruction: "Rename the current branch to feature-user-profile.",
            hint: "Use 'git branch -m feature-user-profile'",
            expected: /^git\s+branch\s+-m\s+feature-user-profile$/,
            successMsg: "Current branch renamed to 'feature-user-profile'.",
          },
        ],
      },

      {
        id: "m5_l6",
        title: "Delete a Branch",
        description: "Remove a local branch that is no longer needed.",
        concept:
          "git branch -d safely deletes a local branch when Git considers its work merged. -D forces deletion and can discard branch references to unmerged work.",

        tasks: [
          {
            id: "t_branch_delete",
            instruction: "Delete the local feature-login branch safely.",
            hint: "Use 'git branch -d feature-login'",
            expected: /^git\s+branch\s+-d\s+feature-login$/,
            successMsg: "Deleted branch feature-login (was e4f5g6h).",
          },
        ],
      },

      {
        id: "m5_l7",
        title: "Understand HEAD",
        description:
          "See which commit and branch your working tree currently represents.",
        concept:
          "HEAD is Git's reference to your current checkout. Normally HEAD points to a branch, and that branch points to a commit. Understanding HEAD becomes essential when learning reset, rebase, detached HEAD, and reflog.",

        tasks: [
          {
            id: "t_show_head",
            instruction: "Display the commit currently referenced by HEAD.",
            hint: "Use 'git show HEAD'",
            expected: /^git\s+show\s+HEAD$/,
            successMsg: "Showing the commit currently referenced by HEAD.",
          },
        ],
      },
    ],
  },

  // =========================================================
  // MODULE 6 — MERGING & CONFLICTS
  // =========================================================
  {
    id: "m6",
    title: "6. Merging & Conflicts",
    description:
      "Combine branch histories and learn how to resolve competing changes.",
    icon: <GitMerge size={18} />,

    levels: [
      {
        id: "m6_l1",
        title: "Merge a Branch",
        description: "Bring another branch's work into the current branch.",
        concept:
          "git merge combines the history reachable from another branch with your current branch. Depending on history, Git may fast-forward or create a merge commit.",

        tasks: [
          {
            id: "t_merge",
            instruction: "Merge feature-login into the current branch.",
            hint: "Use 'git merge feature-login'",
            expected: /^git\s+merge\s+feature-login$/,
            successMsg: "Updating a1b2c3d..e4f5g6h\nFast-forward",
          },
        ],
      },

      {
        id: "m6_l2",
        title: "Fast-Forward Merge",
        description: "Understand the simplest type of branch merge.",
        concept:
          "A fast-forward is possible when the current branch has no new commits since the other branch diverged. Git can simply move the branch reference forward without creating a merge commit.",

        tasks: [
          {
            id: "t_merge_ff_only",
            instruction:
              "Merge feature-login only if the merge can be fast-forwarded.",
            hint: "Use 'git merge --ff-only feature-login'",
            expected: /^git\s+merge\s+--ff-only\s+feature-login$/,
            successMsg: "Fast-forward merge completed successfully.",
          },
        ],
      },

      {
        id: "m6_l3",
        title: "Force a Merge Commit",
        description:
          "Create a merge commit even when fast-forwarding is possible.",
        concept:
          "git merge --no-ff keeps the existence of a feature branch visible in history by creating a merge commit instead of simply moving the branch pointer.",

        tasks: [
          {
            id: "t_merge_no_ff",
            instruction: "Merge feature-login while forcing a merge commit.",
            hint: "Use 'git merge --no-ff feature-login'",
            expected: /^git\s+merge\s+--no-ff\s+feature-login$/,
            successMsg: "Merge made by the 'ort' strategy.",
          },
        ],
      },

      {
        id: "m6_l4",
        title: "Detect a Merge Conflict",
        description:
          "Recognize when Git cannot automatically combine two changes.",
        concept:
          "A merge conflict occurs when Git cannot confidently determine how competing changes should be combined. Git pauses the merge and marks the affected files as unmerged.",

        tasks: [
          {
            id: "t_conflict_status",
            instruction:
              "Check which files are conflicted during an interrupted merge.",
            hint: "Use 'git status'",
            expected: /^git\s+status$/,
            successMsg: "You have unmerged paths:\n  both modified: index.html",
          },
        ],
      },

      {
        id: "m6_l5",
        title: "Resolve a Conflict",
        description: "Mark a manually resolved file as resolved.",
        concept:
          "After editing the conflicted file and removing conflict markers, staging the file tells Git that the conflict for that path has been resolved.",

        tasks: [
          {
            id: "t_resolve_add",
            instruction: "Mark the resolved index.html file as resolved.",
            hint: "Use 'git add index.html'",
            expected: /^git\s+add\s+index\.html$/,
            successMsg: "Conflict resolution for index.html staged.",
          },
        ],
      },

      {
        id: "m6_l6",
        title: "Complete the Merge",
        description: "Finish a merge after resolving conflicts.",
        concept:
          "After all conflicted files have been resolved and staged, Git can complete the merge and create the resulting merge commit.",

        tasks: [
          {
            id: "t_merge_continue",
            instruction: "Continue the merge after resolving all conflicts.",
            hint: "Use 'git merge --continue'",
            expected: /^git\s+merge\s+--continue$/,
            successMsg: "Merge completed successfully.",
          },
        ],
      },

      {
        id: "m6_l7",
        title: "Abort a Merge",
        description: "Return to the state before a problematic merge began.",
        concept:
          "If a merge becomes too complicated or was started by mistake, git merge --abort attempts to restore the pre-merge state.",

        tasks: [
          {
            id: "t_merge_abort",
            instruction: "Abort the current merge.",
            hint: "Use 'git merge --abort'",
            expected: /^git\s+merge\s+--abort$/,
            successMsg:
              "Merge aborted. Repository restored to its pre-merge state.",
          },
        ],
      },
    ],
  },

  // =========================================================
  // MODULE 7 — REMOTE REPOSITORIES
  // =========================================================
  {
    id: "m7",
    title: "7. Remote Repositories",
    description:
      "Connect local repositories with remote Git servers and synchronize changes.",
    icon: <TerminalSquare size={18} />,

    levels: [
      {
        id: "m7_l1",
        title: "List Remotes",
        description: "See which remote repositories are configured.",
        concept:
          "A remote is a named reference to another Git repository, usually hosted on GitHub or another Git server. The default remote created by git clone is commonly named origin.",

        tasks: [
          {
            id: "t_remote_list",
            instruction: "List configured remotes and their URLs.",
            hint: "Use 'git remote -v'",
            expected: /^git\s+remote\s+-v$/,
            successMsg:
              "origin  https://github.com/user/project.git (fetch)\norigin  https://github.com/user/project.git (push)",
          },
        ],
      },

      {
        id: "m7_l2",
        title: "Add a Remote",
        description: "Connect your local repository to a remote repository.",
        concept:
          "git remote add creates a named remote reference. The name origin is conventional for the primary remote repository, but Git does not require that name.",

        tasks: [
          {
            id: "t_remote_add",
            instruction:
              "Add https://github.com/user/project.git as a remote named origin.",
            hint: "Use 'git remote add origin https://github.com/user/project.git'",
            expected:
              /^git\s+remote\s+add\s+origin\s+https:\/\/github\.com\/user\/project\.git$/,
            successMsg: "Remote 'origin' added.",
          },
        ],
      },

      {
        id: "m7_l3",
        title: "Inspect a Remote",
        description: "View detailed information about a remote repository.",
        concept:
          "git remote show displays useful information about a remote, including its fetch URL, push URL, HEAD branch, tracked branches, and synchronization status.",

        tasks: [
          {
            id: "t_remote_show",
            instruction: "Inspect the origin remote.",
            hint: "Use 'git remote show origin'",
            expected: /^git\s+remote\s+show\s+origin$/,
            successMsg:
              "* remote origin\n  Fetch URL: https://github.com/user/project.git\n  HEAD branch: main",
          },
        ],
      },

      {
        id: "m7_l4",
        title: "Fetch Remote Changes",
        description:
          "Download remote commits without changing your current branch.",
        concept:
          "git fetch downloads updated commits and references from a remote. Unlike git pull, it does not automatically integrate those changes into your current branch.",

        tasks: [
          {
            id: "t_fetch",
            instruction: "Fetch the latest references from origin.",
            hint: "Use 'git fetch origin'",
            expected: /^git\s+fetch\s+origin$/,
            successMsg: "Remote references downloaded from origin.",
          },
        ],
      },

      {
        id: "m7_l5",
        title: "Pull Remote Changes",
        description:
          "Fetch remote changes and integrate them into your branch.",
        concept:
          "git pull is effectively a fetch followed by integration into the current branch. Depending on configuration, that integration may use merge or rebase.",

        tasks: [
          {
            id: "t_pull",
            instruction: "Pull the latest main branch from origin.",
            hint: "Use 'git pull origin main'",
            expected: /^git\s+pull\s+origin\s+main$/,
            successMsg:
              "Successfully updated the current branch from origin/main.",
          },
        ],
      },

      {
        id: "m7_l6",
        title: "Push a Branch",
        description: "Send local commits to a remote repository.",
        concept:
          "git push transfers commits and updates a branch reference on the remote repository. The remote may reject the push if your branch is behind or if branch protection prevents the update.",

        tasks: [
          {
            id: "t_push",
            instruction: "Push feature-login to origin.",
            hint: "Use 'git push origin feature-login'",
            expected: /^git\s+push\s+origin\s+feature-login$/,
            successMsg: "feature-login pushed to origin.",
          },
        ],
      },

      {
        id: "m7_l7",
        title: "Set an Upstream Branch",
        description: "Connect a local branch with its remote tracking branch.",
        concept:
          "An upstream branch allows commands like git pull and git push to know which remote branch the current local branch normally synchronizes with.",

        tasks: [
          {
            id: "t_push_upstream",
            instruction:
              "Push feature-login and configure origin/feature-login as its upstream.",
            hint: "Use 'git push -u origin feature-login'",
            expected:
              /^git\s+push\s+(?:-u|--set-upstream)\s+origin\s+feature-login$/,
            successMsg:
              "Branch 'feature-login' set up to track 'origin/feature-login'.",
          },
        ],
      },

      {
        id: "m7_l8",
        title: "Rename a Remote",
        description: "Change the local name assigned to a remote.",
        concept:
          "Remote names such as origin are only local aliases. Renaming a remote changes that alias without changing the remote repository itself.",

        tasks: [
          {
            id: "t_remote_rename",
            instruction: "Rename the remote origin to upstream.",
            hint: "Use 'git remote rename origin upstream'",
            expected: /^git\s+remote\s+rename\s+origin\s+upstream$/,
            successMsg: "Remote renamed from 'origin' to 'upstream'.",
          },
        ],
      },

      {
        id: "m7_l9",
        title: "Remove a Remote",
        description: "Disconnect a local repository from a configured remote.",
        concept:
          "Removing a remote deletes the local remote configuration. It does not delete the repository hosted on GitHub or another server.",

        tasks: [
          {
            id: "t_remote_remove",
            instruction: "Remove the remote named upstream.",
            hint: "Use 'git remote remove upstream'",
            expected: /^git\s+remote\s+(?:remove|rm)\s+upstream$/,
            successMsg: "Remote 'upstream' removed.",
          },
        ],
      },
    ],
  },

  // =========================================================
  // MODULE 8 — UNDOING CHANGES
  // =========================================================
  {
    id: "m8",
    title: "8. Undoing Changes",
    description:
      "Safely undo working-tree changes, staging mistakes, and committed changes.",
    icon: <GitCommit size={18} />,

    levels: [
      {
        id: "m8_l1",
        title: "Discard Working Changes",
        description:
          "Restore a modified file to its last staged or committed state.",
        concept:
          "git restore can discard modifications in the working directory. Because those uncommitted changes may be permanently lost, this command should be used deliberately.",

        tasks: [
          {
            id: "t_restore_file",
            instruction: "Discard the unstaged changes in index.html.",
            hint: "Use 'git restore index.html'",
            expected: /^git\s+restore\s+index\.html$/,
            successMsg: "Working-tree changes in index.html discarded.",
          },
        ],
      },

      {
        id: "m8_l2",
        title: "Unstage Without Losing Work",
        description:
          "Remove a file from staging while preserving its modifications.",
        concept:
          "git restore --staged changes the staging area without removing your working-directory edits. This is useful when a file was added to the next commit accidentally.",

        tasks: [
          {
            id: "t_restore_staged",
            instruction: "Unstage index.html while keeping its changes.",
            hint: "Use 'git restore --staged index.html'",
            expected: /^git\s+restore\s+--staged\s+index\.html$/,
            successMsg: "index.html unstaged. Working changes preserved.",
          },
        ],
      },

      {
        id: "m8_l3",
        title: "Soft Reset",
        description: "Remove the last commit while keeping its changes staged.",
        concept:
          "git reset --soft moves the branch reference while leaving both the staging area and working tree unchanged. It is useful when you want to recreate the last commit.",

        tasks: [
          {
            id: "t_reset_soft",
            instruction:
              "Move back one commit while keeping the changes staged.",
            hint: "Use 'git reset --soft HEAD~1'",
            expected: /^git\s+reset\s+--soft\s+HEAD~1$/,
            successMsg: "HEAD moved back one commit. Changes remain staged.",
          },
        ],
      },

      {
        id: "m8_l4",
        title: "Mixed Reset",
        description:
          "Remove a commit and return its changes to the working directory.",
        concept:
          "The default reset mode is mixed. It moves the branch reference and resets the staging area, while normally preserving the working-tree files.",

        tasks: [
          {
            id: "t_reset_mixed",
            instruction: "Move back one commit and leave its changes unstaged.",
            hint: "Use 'git reset HEAD~1'",
            expected: /^git\s+reset(?:\s+--mixed)?\s+HEAD~1$/,
            successMsg: "HEAD moved back one commit. Changes are now unstaged.",
          },
        ],
      },

      {
        id: "m8_l5",
        title: "Hard Reset",
        description: "Move history and discard tracked working-tree changes.",
        concept:
          "git reset --hard changes HEAD, the staging area, and tracked working-tree files. It is powerful and destructive because uncommitted tracked changes can be lost.",

        tasks: [
          {
            id: "t_reset_hard",
            instruction:
              "Reset the repository completely to the previous commit.",
            hint: "Use 'git reset --hard HEAD~1'",
            expected: /^git\s+reset\s+--hard\s+HEAD~1$/,
            successMsg: "HEAD is now at the previous commit.",
          },
        ],
      },

      {
        id: "m8_l6",
        title: "Revert a Commit",
        description: "Undo a commit without rewriting existing history.",
        concept:
          "git revert creates a new commit that reverses the changes introduced by an earlier commit. This makes revert safer than reset for history that has already been shared with other developers.",

        tasks: [
          {
            id: "t_revert",
            instruction: "Revert commit a1b2c3d.",
            hint: "Use 'git revert a1b2c3d'",
            expected: /^git\s+revert\s+a1b2c3d$/,
            successMsg: "[main d4e5f6a] Revert previous change",
          },
        ],
      },

      {
        id: "m8_l7",
        title: "Reset vs Revert",
        description:
          "Understand which history-changing operation is appropriate.",
        concept:
          "Reset moves references and is primarily useful for local history. Revert creates a new commit and preserves existing history. As a general collaboration rule, reverting shared history is safer than resetting and force-pushing it.",

        tasks: [
          {
            id: "t_safe_shared_undo",
            instruction:
              "Undo shared commit b2c3d4e without rewriting existing history.",
            hint: "Use 'git revert b2c3d4e'",
            expected: /^git\s+revert\s+b2c3d4e$/,
            successMsg: "Shared change safely reversed with a new commit.",
          },
        ],
      },
    ],
  },

  // =========================================================
  // MODULE 9 — RECOVERY WITH REFLOG
  // =========================================================
  {
    id: "m9",
    title: "9. Recovery with Reflog",
    description:
      "Recover commits and branch positions that appear to have been lost.",
    icon: <TerminalSquare size={18} />,

    levels: [
      {
        id: "m9_l1",
        title: "View the Reflog",
        description: "Inspect recent movements of HEAD and local references.",
        concept:
          "The reflog records updates to local references such as HEAD. Even when a commit disappears from normal git log output after reset or rebase, the reflog may still contain a reference to where HEAD previously pointed.",

        tasks: [
          {
            id: "t_reflog",
            instruction: "Display the HEAD reflog.",
            hint: "Use 'git reflog'",
            expected: /^git\s+reflog$/,
            successMsg:
              "c3d4e5f HEAD@{0}: reset: moving to HEAD~1\nb2c3d4e HEAD@{1}: commit: Important work",
          },
        ],
      },

      {
        id: "m9_l2",
        title: "Inspect an Older HEAD",
        description: "Inspect a repository state recorded by the reflog.",
        concept:
          "Reflog selectors such as HEAD@{1} refer to previous positions of HEAD. They are useful when identifying the exact state you want to recover.",

        tasks: [
          {
            id: "t_show_reflog",
            instruction: "Inspect the previous HEAD position.",
            hint: "Use 'git show HEAD@{1}'",
            expected: /^git\s+show\s+HEAD@\{1\}$/,
            successMsg: "Showing the previous HEAD position.",
          },
        ],
      },

      {
        id: "m9_l3",
        title: "Recover a Lost Commit",
        description: "Create a new branch pointing to recovered work.",
        concept:
          "Once you find a lost commit in the reflog, creating a branch at that reference gives the commit a normal branch reference again and protects it from eventually becoming unreachable.",

        tasks: [
          {
            id: "t_recover_branch",
            instruction: "Create a branch named recovered-work from HEAD@{1}.",
            hint: "Use 'git branch recovered-work HEAD@{1}'",
            expected: /^git\s+branch\s+recovered-work\s+HEAD@\{1\}$/,
            successMsg:
              "Branch 'recovered-work' created from recovered history.",
          },
        ],
      },

      {
        id: "m9_l4",
        title: "Recover After Hard Reset",
        description:
          "Move your current branch back to a previous reflog position.",
        concept:
          "If a hard reset moved the branch to the wrong place, reflog can reveal its earlier position. reset --hard can then restore the repository to that point, but it can overwrite current uncommitted changes.",

        tasks: [
          {
            id: "t_recover_reset",
            instruction: "Restore the current branch to HEAD@{1}.",
            hint: "Use 'git reset --hard HEAD@{1}'",
            expected: /^git\s+reset\s+--hard\s+HEAD@\{1\}$/,
            successMsg: "Repository restored to the selected reflog position.",
          },
        ],
      },

      {
        id: "m9_l5",
        title: "Reflog Mental Model",
        description: "Use reflog as a local safety net for reference movement.",
        concept:
          "git log shows commit ancestry reachable through references. git reflog instead records where local references have moved. This makes reflog especially useful after reset, rebase, amend, or accidental branch deletion.",

        tasks: [
          {
            id: "t_reflog_specific_branch",
            instruction: "View the reflog for the main branch.",
            hint: "Use 'git reflog show main'",
            expected: /^git\s+reflog\s+show\s+main$/,
            successMsg: "Showing reference history for the main branch.",
          },
        ],
      },
    ],
  },

  // =========================================================
  // MODULE 10 — STASHING
  // =========================================================
  {
    id: "m10",
    title: "10. Stashing Work",
    description:
      "Temporarily store unfinished changes without creating a normal commit.",
    icon: <GitCommit size={18} />,

    levels: [
      {
        id: "m10_l1",
        title: "Create a Stash",
        description: "Temporarily store tracked working changes.",
        concept:
          "git stash saves suitable working-directory and staging-area changes so you can return to a cleaner working tree without creating a normal branch commit.",

        tasks: [
          {
            id: "t_stash",
            instruction: "Stash your current changes.",
            hint: "Use 'git stash'",
            expected: /^git\s+stash(?:\s+push)?$/,
            successMsg: "Saved working directory and index state.",
          },
        ],
      },

      {
        id: "m10_l2",
        title: "Create a Named Stash",
        description: "Save unfinished work with a descriptive message.",
        concept:
          "Named stashes are easier to recognize later when several temporary work states exist.",

        tasks: [
          {
            id: "t_stash_named",
            instruction: "Create a stash with the message 'login work'.",
            hint: "Use 'git stash push -m \"login work\"'",
            expected: /^git\s+stash\s+push\s+-m\s+["']login work["']$/,
            successMsg: "Saved working directory and index state: login work",
          },
        ],
      },

      {
        id: "m10_l3",
        title: "Stash Untracked Files",
        description: "Include new untracked files in a stash.",
        concept:
          "By default, untracked files are not included in an ordinary stash. The -u or --include-untracked option includes them.",

        tasks: [
          {
            id: "t_stash_untracked",
            instruction: "Stash your changes including untracked files.",
            hint: "Use 'git stash -u'",
            expected: /^git\s+stash(?:\s+push)?\s+(?:-u|--include-untracked)$/,
            successMsg: "Tracked and untracked changes stashed.",
          },
        ],
      },

      {
        id: "m10_l4",
        title: "List Stashes",
        description: "See temporary work states currently stored.",
        concept:
          "Git stores stashes in a stack-like reference. git stash list displays entries such as stash@{0}, stash@{1}, and their descriptions.",

        tasks: [
          {
            id: "t_stash_list",
            instruction: "List all saved stashes.",
            hint: "Use 'git stash list'",
            expected: /^git\s+stash\s+list$/,
            successMsg:
              "stash@{0}: On main: login work\nstash@{1}: WIP on main",
          },
        ],
      },

      {
        id: "m10_l5",
        title: "Inspect a Stash",
        description: "See the changes stored inside a stash.",
        concept:
          "git stash show summarizes a stash. Adding -p displays its patch so you can inspect the actual changes before applying them.",

        tasks: [
          {
            id: "t_stash_show",
            instruction: "Display the full patch for stash@{0}.",
            hint: "Use 'git stash show -p stash@{0}'",
            expected: /^git\s+stash\s+show\s+-p\s+stash@\{0\}$/,
            successMsg: "Showing the full changes stored in stash@{0}.",
          },
        ],
      },

      {
        id: "m10_l6",
        title: "Apply a Stash",
        description: "Restore stashed changes while keeping the stash entry.",
        concept:
          "git stash apply reapplies saved changes but leaves the stash entry available. This is useful when you may need to apply the same stash elsewhere.",

        tasks: [
          {
            id: "t_stash_apply",
            instruction: "Apply stash@{0} without deleting it.",
            hint: "Use 'git stash apply stash@{0}'",
            expected: /^git\s+stash\s+apply\s+stash@\{0\}$/,
            successMsg: "stash@{0} applied. Stash entry preserved.",
          },
        ],
      },

      {
        id: "m10_l7",
        title: "Pop a Stash",
        description: "Apply a stash and remove it when successful.",
        concept:
          "git stash pop combines applying a stash with dropping it after a successful application.",

        tasks: [
          {
            id: "t_stash_pop",
            instruction: "Apply the latest stash and remove it.",
            hint: "Use 'git stash pop'",
            expected: /^git\s+stash\s+pop$/,
            successMsg: "Applied stash and dropped stash@{0}.",
          },
        ],
      },

      {
        id: "m10_l8",
        title: "Drop a Stash",
        description: "Delete one saved stash without applying it.",
        concept:
          "git stash drop permanently removes a selected stash entry from the stash list.",

        tasks: [
          {
            id: "t_stash_drop",
            instruction: "Delete stash@{0}.",
            hint: "Use 'git stash drop stash@{0}'",
            expected: /^git\s+stash\s+drop\s+stash@\{0\}$/,
            successMsg: "Dropped stash@{0}.",
          },
        ],
      },

      {
        id: "m10_l9",
        title: "Clear All Stashes",
        description: "Delete the complete stash stack.",
        concept:
          "git stash clear removes all stash entries. Unlike normal branch history, this should be treated as destructive cleanup.",

        tasks: [
          {
            id: "t_stash_clear",
            instruction: "Delete every saved stash.",
            hint: "Use 'git stash clear'",
            expected: /^git\s+stash\s+clear$/,
            successMsg: "All stash entries removed.",
          },
        ],
      },
    ],
  },

  // =========================================================
  // MODULE 11 — REBASE & CHERRY-PICK
  // =========================================================
  {
    id: "m11",
    title: "11. Rebase & Cherry-Pick",
    description:
      "Rewrite local history, maintain linear branches, and selectively apply commits.",
    icon: <GitMerge size={18} />,

    levels: [
      {
        id: "m11_l1",
        title: "Rebase onto Main",
        description:
          "Replay your feature commits on top of the latest main branch.",
        concept:
          "Rebase takes commits from your branch and recreates them on a different base commit. Because the commits are recreated, their commit hashes change.",

        tasks: [
          {
            id: "t_rebase_main",
            instruction: "Rebase the current branch onto main.",
            hint: "Use 'git rebase main'",
            expected: /^git\s+rebase\s+main$/,
            successMsg: "Successfully rebased and updated the current branch.",
          },
        ],
      },

      {
        id: "m11_l2",
        title: "Resolve a Rebase Conflict",
        description: "Resolve conflicts encountered while replaying commits.",
        concept:
          "During rebase, Git replays commits one at a time. If a commit conflicts, Git pauses so you can edit the conflicting files and stage their resolved versions.",

        tasks: [
          {
            id: "t_rebase_resolve",
            instruction: "Mark index.html as resolved during a rebase.",
            hint: "Use 'git add index.html'",
            expected: /^git\s+add\s+index\.html$/,
            successMsg: "index.html marked as resolved.",
          },
        ],
      },

      {
        id: "m11_l3",
        title: "Continue Rebase",
        description: "Continue replaying commits after resolving a conflict.",
        concept:
          "After conflicts are resolved and staged, git rebase --continue tells Git to finish the current replay step and continue with the remaining commits.",

        tasks: [
          {
            id: "t_rebase_continue",
            instruction: "Continue the paused rebase.",
            hint: "Use 'git rebase --continue'",
            expected: /^git\s+rebase\s+--continue$/,
            successMsg: "Rebase continued successfully.",
          },
        ],
      },

      {
        id: "m11_l4",
        title: "Abort Rebase",
        description: "Cancel an in-progress rebase.",
        concept:
          "git rebase --abort attempts to restore the branch to the state it had before the rebase began.",

        tasks: [
          {
            id: "t_rebase_abort",
            instruction: "Abort the current rebase.",
            hint: "Use 'git rebase --abort'",
            expected: /^git\s+rebase\s+--abort$/,
            successMsg: "Rebase aborted. Original branch state restored.",
          },
        ],
      },

      {
        id: "m11_l5",
        title: "Interactive Rebase",
        description: "Edit a sequence of recent commits.",
        concept:
          "Interactive rebase opens a list of commits and lets you choose actions such as pick, reword, edit, squash, fixup, or drop. It is one of Git's main history-cleanup tools.",

        tasks: [
          {
            id: "t_rebase_interactive",
            instruction:
              "Start an interactive rebase for the last three commits.",
            hint: "Use 'git rebase -i HEAD~3'",
            expected: /^git\s+rebase\s+-i\s+HEAD~3$/,
            successMsg: "Interactive rebase opened for the last 3 commits.",
          },
        ],
      },

      {
        id: "m11_l6",
        title: "Cherry-Pick a Commit",
        description: "Apply one specific commit onto the current branch.",
        concept:
          "git cherry-pick takes the changes introduced by an existing commit and creates a new commit containing those changes on your current branch.",

        tasks: [
          {
            id: "t_cherry_pick",
            instruction: "Cherry-pick commit a1b2c3d.",
            hint: "Use 'git cherry-pick a1b2c3d'",
            expected: /^git\s+cherry-pick\s+a1b2c3d$/,
            successMsg: "Commit a1b2c3d applied to the current branch.",
          },
        ],
      },

      {
        id: "m11_l7",
        title: "Continue Cherry-Pick",
        description: "Continue after resolving a cherry-pick conflict.",
        concept:
          "If cherry-pick encounters a conflict, resolve and stage the affected files, then use --continue to complete the operation.",

        tasks: [
          {
            id: "t_cherry_continue",
            instruction: "Continue the paused cherry-pick.",
            hint: "Use 'git cherry-pick --continue'",
            expected: /^git\s+cherry-pick\s+--continue$/,
            successMsg: "Cherry-pick completed.",
          },
        ],
      },

      {
        id: "m11_l8",
        title: "Abort Cherry-Pick",
        description: "Cancel a cherry-pick that cannot be completed safely.",
        concept:
          "git cherry-pick --abort restores the repository to its state before the current cherry-pick sequence began.",

        tasks: [
          {
            id: "t_cherry_abort",
            instruction: "Abort the current cherry-pick.",
            hint: "Use 'git cherry-pick --abort'",
            expected: /^git\s+cherry-pick\s+--abort$/,
            successMsg: "Cherry-pick aborted.",
          },
        ],
      },
    ],
  },

  // =========================================================
  // MODULE 12 — TAGS
  // =========================================================
  {
    id: "m12",
    title: "12. Git Tags",
    description:
      "Mark important commits such as software releases with stable names.",
    icon: <GitBranch size={18} />,

    levels: [
      {
        id: "m12_l1",
        title: "List Tags",
        description: "View tags that exist in the repository.",
        concept:
          "Tags are references commonly used to mark important commits such as releases. Unlike branches, tags are normally intended to remain fixed at a particular commit.",

        tasks: [
          {
            id: "t_tag_list",
            instruction: "List repository tags.",
            hint: "Use 'git tag'",
            expected: /^git\s+tag$/,
            successMsg: "v0.9.0\nv1.0.0",
          },
        ],
      },

      {
        id: "m12_l2",
        title: "Create a Lightweight Tag",
        description: "Create a simple tag pointing to a commit.",
        concept:
          "A lightweight tag is essentially a named reference directly pointing to a commit.",

        tasks: [
          {
            id: "t_tag_lightweight",
            instruction: "Create a lightweight tag named v1.0.0.",
            hint: "Use 'git tag v1.0.0'",
            expected: /^git\s+tag\s+v1\.0\.0$/,
            successMsg: "Tag 'v1.0.0' created.",
          },
        ],
      },

      {
        id: "m12_l3",
        title: "Create an Annotated Tag",
        description:
          "Create a tag containing additional metadata and a message.",
        concept:
          "Annotated tags are full Git objects containing information such as the tagger, date, and message. They are generally preferable for formal releases.",

        tasks: [
          {
            id: "t_tag_annotated",
            instruction:
              "Create annotated tag v1.1.0 with message 'Version 1.1.0'.",
            hint: "Use 'git tag -a v1.1.0 -m \"Version 1.1.0\"'",
            expected:
              /^git\s+tag\s+-a\s+v1\.1\.0\s+-m\s+["']Version 1\.1\.0["']$/,
            successMsg: "Annotated tag 'v1.1.0' created.",
          },
        ],
      },

      {
        id: "m12_l4",
        title: "Inspect a Tag",
        description: "View the commit and metadata associated with a tag.",
        concept:
          "git show works with tags as well as commits. For annotated tags, it displays tag metadata together with information about the referenced commit.",

        tasks: [
          {
            id: "t_tag_show",
            instruction: "Inspect tag v1.1.0.",
            hint: "Use 'git show v1.1.0'",
            expected: /^git\s+show\s+v1\.1\.0$/,
            successMsg: "Showing information for tag v1.1.0.",
          },
        ],
      },

      {
        id: "m12_l5",
        title: "Push One Tag",
        description: "Publish a local tag to the remote repository.",
        concept:
          "Normal git push does not necessarily send every local tag. You can explicitly push an individual tag to a remote.",

        tasks: [
          {
            id: "t_push_tag",
            instruction: "Push tag v1.1.0 to origin.",
            hint: "Use 'git push origin v1.1.0'",
            expected: /^git\s+push\s+origin\s+v1\.1\.0$/,
            successMsg: "Tag v1.1.0 pushed to origin.",
          },
        ],
      },

      {
        id: "m12_l6",
        title: "Push All Tags",
        description: "Publish all local tags to the remote.",
        concept:
          "git push --tags sends tags that exist locally and are missing from the target remote.",

        tasks: [
          {
            id: "t_push_tags",
            instruction: "Push all local tags to origin.",
            hint: "Use 'git push origin --tags'",
            expected: /^git\s+push\s+origin\s+--tags$/,
            successMsg: "All local tags pushed to origin.",
          },
        ],
      },

      {
        id: "m12_l7",
        title: "Delete a Local Tag",
        description: "Remove a tag from your local repository.",
        concept:
          "Deleting a local tag removes only your local reference. A copy already pushed to a remote remains there until separately deleted.",

        tasks: [
          {
            id: "t_delete_tag",
            instruction: "Delete local tag v1.0.0.",
            hint: "Use 'git tag -d v1.0.0'",
            expected: /^git\s+tag\s+-d\s+v1\.0\.0$/,
            successMsg: "Deleted tag 'v1.0.0'.",
          },
        ],
      },

      {
        id: "m12_l8",
        title: "Delete a Remote Tag",
        description: "Remove a published tag from a remote repository.",
        concept:
          "Deleting a local tag does not remove its remote counterpart. git push --delete can explicitly remove the tag reference from the remote.",

        tasks: [
          {
            id: "t_delete_remote_tag",
            instruction: "Delete tag v1.0.0 from origin.",
            hint: "Use 'git push origin --delete v1.0.0'",
            expected: /^git\s+push\s+origin\s+--delete\s+v1\.0\.0$/,
            successMsg: "Remote tag v1.0.0 deleted.",
          },
        ],
      },
    ],
  },

  // =========================================================
  // MODULE 13 — GITHUB CLI SETUP & AUTHENTICATION
  // =========================================================
  {
    id: "m13",
    title: "13. GitHub CLI Setup & Authentication",
    description:
      "Configure GitHub CLI and authenticate your terminal with GitHub.",
    icon: <TerminalSquare size={18} />,

    levels: [
      {
        id: "m13_l1",
        title: "Check gh Version",
        description: "Verify that GitHub CLI is installed.",
        concept:
          "GitHub CLI uses the 'gh' command. Checking its version confirms that the CLI is installed and accessible from your terminal.",

        tasks: [
          {
            id: "t_gh_version",
            instruction: "Check the installed GitHub CLI version.",
            hint: "Use 'gh --version'",
            expected: /^gh\s+--version$/,
            successMsg: "gh version installed successfully.",
          },
        ],
      },

      {
        id: "m13_l2",
        title: "Login to GitHub",
        description: "Authenticate GitHub CLI with your GitHub account.",
        concept:
          "gh auth login connects GitHub CLI to your GitHub account. GitHub CLI can use browser-based authentication or token-based authentication depending on your environment.",

        tasks: [
          {
            id: "t_gh_auth_login",
            instruction: "Start GitHub CLI authentication.",
            hint: "Use 'gh auth login'",
            expected: /^gh\s+auth\s+login$/,
            successMsg: "✓ Authentication completed successfully.",
          },
        ],
      },

      {
        id: "m13_l3",
        title: "Check Authentication Status",
        description: "Verify which GitHub account is currently authenticated.",
        concept:
          "gh auth status shows configured GitHub hosts and accounts and identifies which account is currently active.",

        tasks: [
          {
            id: "t_gh_auth_status",
            instruction: "Check your GitHub authentication status.",
            hint: "Use 'gh auth status'",
            expected: /^gh\s+auth\s+status$/,
            successMsg: "github.com\n  ✓ Logged in to github.com account alex",
          },
        ],
      },

      {
        id: "m13_l4",
        title: "Switch GitHub Account",
        description: "Change which authenticated GitHub account is active.",
        concept:
          "GitHub CLI can store multiple authenticated accounts for a host. gh auth switch changes which account subsequent commands use.",

        tasks: [
          {
            id: "t_gh_auth_switch",
            instruction: "Switch the active GitHub account to 'alex'.",
            hint: "Use 'gh auth switch --user alex'",
            expected: /^gh\s+auth\s+switch\s+(?:--user|-u)\s+alex$/,
            successMsg: "✓ Switched active account to alex.",
          },
        ],
      },

      {
        id: "m13_l5",
        title: "Configure Git Protocol",
        description:
          "Choose whether GitHub CLI uses SSH or HTTPS for Git operations.",
        concept:
          "GitHub CLI stores a git_protocol setting. Choosing SSH means commands such as repository cloning can use SSH rather than HTTPS when no explicit protocol is supplied.",

        tasks: [
          {
            id: "t_gh_git_protocol",
            instruction:
              "Configure GitHub CLI to use SSH for Git operations on github.com.",
            hint: "Use 'gh config set git_protocol ssh --host github.com'",
            expected:
              /^gh\s+config\s+set\s+git_protocol\s+ssh\s+--host\s+github\.com$/,
            successMsg: "Git protocol configured as SSH for github.com.",
          },
        ],
      },

      {
        id: "m13_l6",
        title: "Configure Git Authentication",
        description: "Let GitHub CLI configure Git credential integration.",
        concept:
          "gh auth setup-git configures Git to use GitHub CLI credentials for authenticated Git operations where appropriate.",

        tasks: [
          {
            id: "t_gh_setup_git",
            instruction: "Configure Git to use your GitHub CLI authentication.",
            hint: "Use 'gh auth setup-git'",
            expected: /^gh\s+auth\s+setup-git$/,
            successMsg: "Git authentication configured using GitHub CLI.",
          },
        ],
      },

      {
        id: "m13_l7",
        title: "Logout",
        description: "Remove locally stored GitHub CLI authentication.",
        concept:
          "gh auth logout removes the stored authentication configuration for the selected account from GitHub CLI. It does not necessarily revoke the underlying OAuth token on GitHub.",

        tasks: [
          {
            id: "t_gh_logout",
            instruction: "Log out from GitHub CLI.",
            hint: "Use 'gh auth logout'",
            expected: /^gh\s+auth\s+logout$/,
            successMsg: "✓ Logged out of GitHub CLI.",
          },
        ],
      },
    ],
  },

  // =========================================================
  // MODULE 14 — GITHUB REPOSITORY MANAGEMENT
  // =========================================================
  {
    id: "m14",
    title: "14. GitHub Repository Management",
    description:
      "Create, clone, inspect, fork, and synchronize GitHub repositories.",
    icon: <GitHubMark size={18} />,

    levels: [
      {
        id: "m14_l1",
        title: "View Repository",
        description: "Inspect information about the current GitHub repository.",
        concept:
          "gh repo view displays repository information such as its description and README. Without a repository argument, GitHub CLI determines the repository from your current Git directory.",

        tasks: [
          {
            id: "t_repo_view",
            instruction: "View information about the current repository.",
            hint: "Use 'gh repo view'",
            expected: /^gh\s+repo\s+view$/,
            successMsg: "user/project\nRepository information displayed.",
          },
        ],
      },

      {
        id: "m14_l2",
        title: "Create a Repository",
        description: "Create a new repository on GitHub.",
        concept:
          "gh repo create can create public, private, or internal repositories directly from the terminal.",

        tasks: [
          {
            id: "t_repo_create",
            instruction: "Create a public repository named my-project.",
            hint: "Use 'gh repo create my-project --public'",
            expected: /^gh\s+repo\s+create\s+my-project\s+--public$/,
            successMsg: "✓ Created repository user/my-project on GitHub.",
          },
        ],
      },

      {
        id: "m14_l3",
        title: "Publish an Existing Project",
        description:
          "Create a GitHub repository from your current local project.",
        concept:
          "The --source option tells GitHub CLI to create the repository using an existing local repository. --push can immediately upload its commits.",

        tasks: [
          {
            id: "t_repo_existing",
            instruction:
              "Create a public GitHub repository named my-project from the current directory and push its commits.",
            hint: "Use 'gh repo create my-project --public --source=. --push'",
            expected:
              /^gh\s+repo\s+create\s+my-project\s+--public\s+--source=\.\s+--push$/,
            successMsg: "✓ Created repository and pushed local commits.",
          },
        ],
      },

      {
        id: "m14_l4",
        title: "Clone a Repository",
        description: "Clone a GitHub repository using gh.",
        concept:
          "gh repo clone works similarly to git clone but accepts GitHub OWNER/REPO notation directly and integrates with your GitHub CLI configuration.",

        tasks: [
          {
            id: "t_gh_clone",
            instruction: "Clone the repository octocat/Hello-World.",
            hint: "Use 'gh repo clone octocat/Hello-World'",
            expected: /^gh\s+repo\s+clone\s+octocat\/Hello-World$/,
            successMsg: "Cloning into 'Hello-World'...\n✓ Repository cloned.",
          },
        ],
      },

      {
        id: "m14_l5",
        title: "List Repositories",
        description:
          "List repositories owned by a GitHub user or organization.",
        concept:
          "gh repo list displays repositories owned by the supplied account. Without an owner argument, it uses the authenticated user.",

        tasks: [
          {
            id: "t_repo_list",
            instruction:
              "List repositories owned by your authenticated account.",
            hint: "Use 'gh repo list'",
            expected: /^gh\s+repo\s+list$/,
            successMsg: "user/project       public\nuser/backend       private",
          },
        ],
      },

      {
        id: "m14_l6",
        title: "Fork a Repository",
        description: "Create your own fork of someone else's repository.",
        concept:
          "A fork is a GitHub-side copy of another repository under your account or organization. gh repo fork can create the fork and optionally clone it locally.",

        tasks: [
          {
            id: "t_repo_fork",
            instruction: "Fork cli/cli and clone the fork locally.",
            hint: "Use 'gh repo fork cli/cli --clone'",
            expected: /^gh\s+repo\s+fork\s+cli\/cli\s+--clone$/,
            successMsg: "✓ Created fork\n✓ Cloned fork locally.",
          },
        ],
      },

      {
        id: "m14_l7",
        title: "Sync a Fork",
        description: "Synchronize your fork with its upstream repository.",
        concept:
          "gh repo sync updates a destination repository from its source repository. For a fork, the parent repository is used as the source by default.",

        tasks: [
          {
            id: "t_repo_sync",
            instruction:
              "Synchronize the current fork with its parent repository.",
            hint: "Use 'gh repo sync'",
            expected: /^gh\s+repo\s+sync$/,
            successMsg: "✓ Repository synchronized with upstream.",
          },
        ],
      },

      {
        id: "m14_l8",
        title: "Open Repository in Browser",
        description: "Jump from your terminal to the repository on GitHub.",
        concept:
          "gh repo view --web opens the selected repository in your configured browser.",

        tasks: [
          {
            id: "t_repo_web",
            instruction: "Open the current repository on GitHub.",
            hint: "Use 'gh repo view --web'",
            expected: /^gh\s+repo\s+view\s+(?:--web|-w)$/,
            successMsg: "Opening repository in your browser.",
          },
        ],
      },
    ],
  },

  // =========================================================
  // MODULE 15 — GITHUB PULL REQUESTS
  // =========================================================
  {
    id: "m15",
    title: "15. GitHub Pull Requests",
    description:
      "Create, inspect, review, merge, and manage pull requests from the terminal.",
    icon: <GitMerge size={18} />,

    levels: [
      {
        id: "m15_l1",
        title: "List Pull Requests",
        description: "See currently open pull requests.",
        concept:
          "gh pr list displays pull requests for the current repository. By default it focuses on open pull requests.",

        tasks: [
          {
            id: "t_pr_list",
            instruction: "List open pull requests.",
            hint: "Use 'gh pr list'",
            expected: /^gh\s+pr\s+list$/,
            successMsg: "12  Add login page  feature-login  OPEN",
          },
        ],
      },

      {
        id: "m15_l2",
        title: "View Pull Request",
        description: "Inspect a pull request directly from the terminal.",
        concept:
          "gh pr view shows the pull request title, description, metadata, reviews, and other useful information.",

        tasks: [
          {
            id: "t_pr_view",
            instruction: "View pull request #12.",
            hint: "Use 'gh pr view 12'",
            expected: /^gh\s+pr\s+view\s+12$/,
            successMsg: "Pull request #12\nAdd login page",
          },
        ],
      },

      {
        id: "m15_l3",
        title: "Create Pull Request",
        description: "Submit your current branch for review.",
        concept:
          "A pull request proposes merging one branch into another. gh pr create can accept the title and body directly so the command runs non-interactively.",

        tasks: [
          {
            id: "t_pr_create",
            instruction:
              "Create a pull request titled 'Add login page' with body 'Implements login UI'.",
            hint: 'Use \'gh pr create --title "Add login page" --body "Implements login UI"\'',
            expected:
              /^gh\s+pr\s+create\s+--title\s+["']Add login page["']\s+--body\s+["']Implements login UI["']$/,
            successMsg: "https://github.com/user/project/pull/12",
          },
        ],
      },

      {
        id: "m15_l4",
        title: "Create Draft Pull Request",
        description: "Create a PR that is not ready for final review.",
        concept:
          "Draft pull requests allow you to publish work and collect feedback while clearly indicating that the changes are not ready to merge.",

        tasks: [
          {
            id: "t_pr_draft",
            instruction:
              "Create a draft pull request titled 'WIP profile page'.",
            hint: 'Use \'gh pr create --draft --title "WIP profile page" --body "Work in progress"\'',
            expected:
              /^gh\s+pr\s+create\s+--draft\s+--title\s+["']WIP profile page["']\s+--body\s+["']Work in progress["']$/,
            successMsg: "✓ Draft pull request created.",
          },
        ],
      },

      {
        id: "m15_l5",
        title: "Check PR Status",
        description: "See pull requests relevant to your current work.",
        concept:
          "gh pr status summarizes pull requests associated with your branches, pull requests you created, and pull requests requesting your review.",

        tasks: [
          {
            id: "t_pr_status",
            instruction: "Display your current pull request status.",
            hint: "Use 'gh pr status'",
            expected: /^gh\s+pr\s+status$/,
            successMsg: "Current branch\n#12 Add login page",
          },
        ],
      },

      {
        id: "m15_l6",
        title: "View PR Diff",
        description: "Inspect the code changes proposed by a pull request.",
        concept:
          "gh pr diff shows the difference introduced by a pull request without requiring you to open the GitHub website.",

        tasks: [
          {
            id: "t_pr_diff",
            instruction: "Display the diff for pull request #12.",
            hint: "Use 'gh pr diff 12'",
            expected: /^gh\s+pr\s+diff\s+12$/,
            successMsg: "Displaying changes for pull request #12.",
          },
        ],
      },

      {
        id: "m15_l7",
        title: "Checkout Pull Request",
        description: "Download and switch to a PR branch locally.",
        concept:
          "gh pr checkout fetches the pull request branch and checks it out locally, making it convenient to test another developer's changes.",

        tasks: [
          {
            id: "t_pr_checkout",
            instruction: "Checkout pull request #12 locally.",
            hint: "Use 'gh pr checkout 12'",
            expected: /^gh\s+pr\s+checkout\s+12$/,
            successMsg: "Switched to pull request branch for #12.",
          },
        ],
      },

      {
        id: "m15_l8",
        title: "Comment on Pull Request",
        description: "Add a discussion comment to a pull request.",
        concept:
          "Pull request comments are useful for general discussion that is not necessarily a formal review decision.",

        tasks: [
          {
            id: "t_pr_comment",
            instruction: "Comment 'Please add tests' on pull request #12.",
            hint: "Use 'gh pr comment 12 --body \"Please add tests\"'",
            expected:
              /^gh\s+pr\s+comment\s+12\s+--body\s+["']Please add tests["']$/,
            successMsg: "✓ Comment added to pull request #12.",
          },
        ],
      },

      {
        id: "m15_l9",
        title: "Approve Pull Request",
        description: "Submit an approving review.",
        concept:
          "An approval is a formal pull request review decision indicating that you accept the proposed changes.",

        tasks: [
          {
            id: "t_pr_approve",
            instruction: "Approve pull request #12.",
            hint: "Use 'gh pr review 12 --approve'",
            expected: /^gh\s+pr\s+review\s+12\s+(?:--approve|-a)$/,
            successMsg: "✓ Approved pull request #12.",
          },
        ],
      },

      {
        id: "m15_l10",
        title: "Request Changes",
        description: "Submit a formal review requesting revisions.",
        concept:
          "Requesting changes records that the pull request needs modifications before you consider it ready to merge.",

        tasks: [
          {
            id: "t_pr_request_changes",
            instruction:
              "Request changes on pull request #12 with message 'Add validation'.",
            hint: "Use 'gh pr review 12 --request-changes --body \"Add validation\"'",
            expected:
              /^gh\s+pr\s+review\s+12\s+--request-changes\s+--body\s+["']Add validation["']$/,
            successMsg: "✓ Changes requested on pull request #12.",
          },
        ],
      },

      {
        id: "m15_l11",
        title: "Merge Pull Request",
        description: "Merge a pull request using a merge commit.",
        concept:
          "gh pr merge can use different merge strategies. --merge creates a merge commit when repository rules allow it.",

        tasks: [
          {
            id: "t_pr_merge",
            instruction: "Merge pull request #12 using a merge commit.",
            hint: "Use 'gh pr merge 12 --merge'",
            expected: /^gh\s+pr\s+merge\s+12\s+(?:--merge|-m)$/,
            successMsg: "✓ Pull request #12 merged.",
          },
        ],
      },

      {
        id: "m15_l12",
        title: "Squash Merge",
        description: "Combine PR commits into one commit while merging.",
        concept:
          "Squash merging creates one resulting commit on the target branch instead of preserving every individual commit from the pull request.",

        tasks: [
          {
            id: "t_pr_squash",
            instruction: "Squash merge pull request #12.",
            hint: "Use 'gh pr merge 12 --squash'",
            expected: /^gh\s+pr\s+merge\s+12\s+(?:--squash|-s)$/,
            successMsg: "✓ Pull request #12 squash merged.",
          },
        ],
      },

      {
        id: "m15_l13",
        title: "Rebase Merge",
        description: "Rebase pull request commits onto the base branch.",
        concept:
          "A rebase merge places the pull request's commits on top of the base branch without creating a merge commit, when the repository allows this strategy.",

        tasks: [
          {
            id: "t_pr_rebase_merge",
            instruction: "Rebase merge pull request #12.",
            hint: "Use 'gh pr merge 12 --rebase'",
            expected: /^gh\s+pr\s+merge\s+12\s+(?:--rebase|-r)$/,
            successMsg: "✓ Pull request #12 rebase merged.",
          },
        ],
      },

      {
        id: "m15_l14",
        title: "Close Pull Request",
        description: "Close a pull request without merging it.",
        concept:
          "Closing a pull request ends the proposal without integrating its changes. The branch itself can continue to exist.",

        tasks: [
          {
            id: "t_pr_close",
            instruction: "Close pull request #12.",
            hint: "Use 'gh pr close 12'",
            expected: /^gh\s+pr\s+close\s+12$/,
            successMsg: "✓ Closed pull request #12.",
          },
        ],
      },

      {
        id: "m15_l15",
        title: "Reopen Pull Request",
        description: "Reopen a previously closed pull request.",
        concept:
          "A closed pull request can be reopened when further discussion or development should continue.",

        tasks: [
          {
            id: "t_pr_reopen",
            instruction: "Reopen pull request #12.",
            hint: "Use 'gh pr reopen 12'",
            expected: /^gh\s+pr\s+reopen\s+12$/,
            successMsg: "✓ Reopened pull request #12.",
          },
        ],
      },
    ],
  },

  // =========================================================
  // MODULE 16 — GITHUB ISSUES
  // =========================================================
  {
    id: "m16",
    title: "16. GitHub Issues",
    description:
      "Create, inspect, assign, discuss, edit, close, and reopen GitHub issues.",
    icon: <GitHubMark size={18} />,

    levels: [
      {
        id: "m16_l1",
        title: "List Issues",
        description: "Display open issues in the current repository.",
        concept:
          "gh issue list shows repository issues. By default it lists open issues, and filters can narrow the results by state, assignee, labels, author, and other criteria.",

        tasks: [
          {
            id: "t_issue_list",
            instruction: "List open issues.",
            hint: "Use 'gh issue list'",
            expected: /^gh\s+issue\s+list$/,
            successMsg: "23  OPEN  Login button broken  bug",
          },
        ],
      },

      {
        id: "m16_l2",
        title: "View Issue",
        description: "Inspect an issue from the terminal.",
        concept:
          "gh issue view displays the issue title, body, labels, assignees, state, and other information.",

        tasks: [
          {
            id: "t_issue_view",
            instruction: "View issue #23.",
            hint: "Use 'gh issue view 23'",
            expected: /^gh\s+issue\s+view\s+23$/,
            successMsg: "Issue #23\nLogin button broken",
          },
        ],
      },

      {
        id: "m16_l3",
        title: "Create Issue",
        description: "Create a new issue without leaving the terminal.",
        concept:
          "gh issue create can create issues interactively or accept the title and body directly through flags.",

        tasks: [
          {
            id: "t_issue_create",
            instruction:
              "Create an issue titled 'Login button broken' with body 'Button does not respond'.",
            hint: 'Use \'gh issue create --title "Login button broken" --body "Button does not respond"\'',
            expected:
              /^gh\s+issue\s+create\s+--title\s+["']Login button broken["']\s+--body\s+["']Button does not respond["']$/,
            successMsg: "https://github.com/user/project/issues/23",
          },
        ],
      },

      {
        id: "m16_l4",
        title: "Create Issue with Label",
        description: "Categorize an issue when creating it.",
        concept:
          "Labels help classify issues such as bugs, documentation work, features, or priority categories.",

        tasks: [
          {
            id: "t_issue_label",
            instruction:
              "Create an issue titled 'API crash' and add the bug label.",
            hint: 'Use \'gh issue create --title "API crash" --body "API crashes on startup" --label bug\'',
            expected:
              /^gh\s+issue\s+create\s+--title\s+["']API crash["']\s+--body\s+["']API crashes on startup["']\s+--label\s+bug$/,
            successMsg: "✓ Issue created with label 'bug'.",
          },
        ],
      },

      {
        id: "m16_l5",
        title: "Assign Issue",
        description: "Assign responsibility for an existing issue.",
        concept:
          "gh issue edit can modify issue metadata. --add-assignee adds one or more assignees, and @me refers to your authenticated GitHub account.",

        tasks: [
          {
            id: "t_issue_assign",
            instruction: "Assign issue #23 to yourself.",
            hint: "Use 'gh issue edit 23 --add-assignee @me'",
            expected:
              /^gh\s+issue\s+edit\s+23\s+--add-assignee\s+["']?@me["']?$/,
            successMsg: "✓ Assigned issue #23 to your account.",
          },
        ],
      },

      {
        id: "m16_l6",
        title: "Comment on Issue",
        description: "Add discussion to an issue.",
        concept:
          "Issue comments allow developers and stakeholders to discuss implementation details, debugging information, or progress without changing the issue description.",

        tasks: [
          {
            id: "t_issue_comment",
            instruction: "Comment 'I am investigating this' on issue #23.",
            hint: "Use 'gh issue comment 23 --body \"I am investigating this\"'",
            expected:
              /^gh\s+issue\s+comment\s+23\s+--body\s+["']I am investigating this["']$/,
            successMsg: "✓ Comment added to issue #23.",
          },
        ],
      },

      {
        id: "m16_l7",
        title: "Edit Issue",
        description: "Modify an existing issue.",
        concept:
          "gh issue edit can change an issue's title, body, labels, assignees, milestone, and other metadata.",

        tasks: [
          {
            id: "t_issue_edit",
            instruction:
              "Change issue #23 title to 'Login button not responding'.",
            hint: "Use 'gh issue edit 23 --title \"Login button not responding\"'",
            expected:
              /^gh\s+issue\s+edit\s+23\s+--title\s+["']Login button not responding["']$/,
            successMsg: "✓ Updated issue #23.",
          },
        ],
      },

      {
        id: "m16_l8",
        title: "Close Issue",
        description: "Mark an issue as closed.",
        concept:
          "Closing an issue indicates that it no longer needs active work. GitHub also supports closure reasons such as completed or not planned.",

        tasks: [
          {
            id: "t_issue_close",
            instruction: "Close issue #23.",
            hint: "Use 'gh issue close 23'",
            expected: /^gh\s+issue\s+close\s+23$/,
            successMsg: "✓ Closed issue #23.",
          },
        ],
      },

      {
        id: "m16_l9",
        title: "Reopen Issue",
        description: "Return a closed issue to active status.",
        concept:
          "Issues can be reopened when a problem returns, additional work is needed, or the previous resolution was incomplete.",

        tasks: [
          {
            id: "t_issue_reopen",
            instruction: "Reopen issue #23.",
            hint: "Use 'gh issue reopen 23'",
            expected: /^gh\s+issue\s+reopen\s+23$/,
            successMsg: "✓ Reopened issue #23.",
          },
        ],
      },
    ],
  },

  // =========================================================
  // MODULE 17 — GITHUB ACTIONS
  // =========================================================
  {
    id: "m17",
    title: "17. GitHub Actions",
    description:
      "Inspect workflows, trigger CI/CD, monitor runs, diagnose failures, and rerun jobs.",
    icon: <TerminalSquare size={18} />,

    levels: [
      {
        id: "m17_l1",
        title: "List Workflows",
        description: "See GitHub Actions workflows configured in a repository.",
        concept:
          "A workflow is a GitHub Actions automation definition, normally stored as YAML under .github/workflows. gh workflow list displays workflows GitHub knows about.",

        tasks: [
          {
            id: "t_workflow_list",
            instruction: "List GitHub Actions workflows.",
            hint: "Use 'gh workflow list'",
            expected: /^gh\s+workflow\s+list$/,
            successMsg: "CI          active\nDeploy      active",
          },
        ],
      },

      {
        id: "m17_l2",
        title: "View Workflow",
        description: "Inspect a specific workflow.",
        concept:
          "gh workflow view displays workflow information. You can identify a workflow using its name, ID, or filename.",

        tasks: [
          {
            id: "t_workflow_view",
            instruction: "View the workflow stored in ci.yml.",
            hint: "Use 'gh workflow view ci.yml'",
            expected: /^gh\s+workflow\s+view\s+ci\.yml$/,
            successMsg: "CI - ci.yml\nWorkflow information displayed.",
          },
        ],
      },

      {
        id: "m17_l3",
        title: "Run Workflow Manually",
        description: "Trigger a workflow_dispatch workflow from your terminal.",
        concept:
          "gh workflow run creates a workflow_dispatch event. The target workflow must support the workflow_dispatch trigger.",

        tasks: [
          {
            id: "t_workflow_run",
            instruction: "Manually run ci.yml.",
            hint: "Use 'gh workflow run ci.yml'",
            expected: /^gh\s+workflow\s+run\s+ci\.yml$/,
            successMsg: "✓ Created workflow_dispatch event for ci.yml.",
          },
        ],
      },

      {
        id: "m17_l4",
        title: "List Workflow Runs",
        description: "See recent executions of GitHub Actions workflows.",
        concept:
          "A workflow definition can execute many times. gh run list displays those individual workflow runs and their current status or conclusion.",

        tasks: [
          {
            id: "t_run_list",
            instruction: "List recent GitHub Actions runs.",
            hint: "Use 'gh run list'",
            expected: /^gh\s+run\s+list$/,
            successMsg: "completed  success  CI\ncompleted  failure  CI",
          },
        ],
      },

      {
        id: "m17_l5",
        title: "View Workflow Run",
        description: "Inspect one specific Actions run.",
        concept:
          "gh run view displays information about one workflow execution, including jobs and run status.",

        tasks: [
          {
            id: "t_run_view",
            instruction: "View workflow run 123456.",
            hint: "Use 'gh run view 123456'",
            expected: /^gh\s+run\s+view\s+123456$/,
            successMsg: "✓ Run CI · 123456\nWorkflow run details displayed.",
          },
        ],
      },

      {
        id: "m17_l6",
        title: "Watch Workflow Run",
        description: "Follow an Actions run until it completes.",
        concept:
          "gh run watch continuously refreshes workflow-run progress in the terminal until the run finishes.",

        tasks: [
          {
            id: "t_run_watch",
            instruction: "Watch workflow run 123456 until completion.",
            hint: "Use 'gh run watch 123456'",
            expected: /^gh\s+run\s+watch\s+123456$/,
            successMsg: "✓ Workflow run completed successfully.",
          },
        ],
      },

      {
        id: "m17_l7",
        title: "View Failed Logs",
        description: "Inspect logs only for failed workflow steps.",
        concept:
          "When CI fails, reading only failed logs can be faster than downloading the complete workflow output. gh run view supports --log-failed for this purpose.",

        tasks: [
          {
            id: "t_run_failed_logs",
            instruction: "Display failed logs for workflow run 123456.",
            hint: "Use 'gh run view 123456 --log-failed'",
            expected: /^gh\s+run\s+view\s+123456\s+--log-failed$/,
            successMsg: "Displaying logs from failed steps.",
          },
        ],
      },

      {
        id: "m17_l8",
        title: "Rerun Workflow",
        description: "Execute a completed workflow run again.",
        concept:
          "gh run rerun starts another attempt based on an existing workflow run.",

        tasks: [
          {
            id: "t_run_rerun",
            instruction: "Rerun workflow run 123456.",
            hint: "Use 'gh run rerun 123456'",
            expected: /^gh\s+run\s+rerun\s+123456$/,
            successMsg: "✓ Requested rerun of workflow run 123456.",
          },
        ],
      },

      {
        id: "m17_l9",
        title: "Rerun Failed Jobs",
        description: "Retry only jobs that failed.",
        concept:
          "The --failed option reruns failed jobs and their dependencies rather than rerunning every successful job in the workflow.",

        tasks: [
          {
            id: "t_run_rerun_failed",
            instruction: "Rerun only failed jobs from run 123456.",
            hint: "Use 'gh run rerun 123456 --failed'",
            expected: /^gh\s+run\s+rerun\s+123456\s+--failed$/,
            successMsg: "✓ Requested rerun of failed jobs.",
          },
        ],
      },

      {
        id: "m17_l10",
        title: "Cancel Workflow Run",
        description: "Stop a running GitHub Actions workflow.",
        concept:
          "gh run cancel requests cancellation of an active workflow run. This is useful when a deployment or CI run is no longer needed or is clearly failing.",

        tasks: [
          {
            id: "t_run_cancel",
            instruction: "Cancel workflow run 123456.",
            hint: "Use 'gh run cancel 123456'",
            expected: /^gh\s+run\s+cancel\s+123456$/,
            successMsg: "✓ Cancellation requested for workflow run 123456.",
          },
        ],
      },
    ],
  },

  // =========================================================
  // MODULE 18 — GITHUB SECRETS & VARIABLES
  // =========================================================
  {
    id: "m18",
    title: "18. GitHub Secrets & Variables",
    description:
      "Manage repository, environment, and organization configuration used by GitHub Actions.",
    icon: <Settings size={18} />,

    levels: [
      {
        id: "m18_l1",
        title: "List Repository Secrets",
        description: "See which secret names exist for a repository.",
        concept:
          "GitHub Actions secrets store sensitive values such as API keys and credentials. GitHub does not reveal secret values when listing them; the CLI displays metadata such as secret names.",

        tasks: [
          {
            id: "t_secret_list",
            instruction: "List repository secrets.",
            hint: "Use 'gh secret list'",
            expected: /^gh\s+secret\s+list$/,
            successMsg: "DATABASE_PASSWORD\nAWS_ACCESS_KEY_ID",
          },
        ],
      },

      {
        id: "m18_l2",
        title: "Create Repository Secret",
        description: "Create or update an encrypted repository secret.",
        concept:
          "gh secret set encrypts the secret value locally before sending it to GitHub. Supplying the value interactively is preferable to placing sensitive data directly in shell history.",

        tasks: [
          {
            id: "t_secret_set",
            instruction:
              "Create a repository secret named DATABASE_PASSWORD and enter its value interactively.",
            hint: "Use 'gh secret set DATABASE_PASSWORD'",
            expected: /^gh\s+secret\s+set\s+DATABASE_PASSWORD$/,
            successMsg: "✓ Set Actions secret DATABASE_PASSWORD.",
          },
        ],
      },

      {
        id: "m18_l3",
        title: "Environment Secret",
        description: "Store a secret for a specific deployment environment.",
        concept:
          "Environment secrets apply only to GitHub Actions jobs using the selected deployment environment. This is useful for separating staging and production credentials.",

        tasks: [
          {
            id: "t_secret_environment",
            instruction:
              "Set DATABASE_PASSWORD for the production environment.",
            hint: "Use 'gh secret set DATABASE_PASSWORD --env production'",
            expected:
              /^gh\s+secret\s+set\s+DATABASE_PASSWORD\s+(?:--env|-e)\s+production$/,
            successMsg: "✓ Set DATABASE_PASSWORD for environment production.",
          },
        ],
      },

      {
        id: "m18_l4",
        title: "Delete Repository Secret",
        description: "Remove a secret that is no longer needed.",
        concept:
          "Removing unused secrets reduces unnecessary credential exposure and keeps repository configuration easier to manage.",

        tasks: [
          {
            id: "t_secret_delete",
            instruction: "Delete repository secret OLD_API_KEY.",
            hint: "Use 'gh secret delete OLD_API_KEY'",
            expected: /^gh\s+secret\s+(?:delete|remove)\s+OLD_API_KEY$/,
            successMsg: "✓ Deleted secret OLD_API_KEY.",
          },
        ],
      },

      {
        id: "m18_l5",
        title: "List Variables",
        description: "Inspect non-secret GitHub Actions variables.",
        concept:
          "Variables are intended for non-sensitive configuration such as deployment regions, feature settings, or application modes. Unlike secrets, variable values can be retrieved and displayed.",

        tasks: [
          {
            id: "t_variable_list",
            instruction: "List repository variables.",
            hint: "Use 'gh variable list'",
            expected: /^gh\s+variable\s+list$/,
            successMsg: "NODE_ENV   production\nAWS_REGION   ap-south-1",
          },
        ],
      },

      {
        id: "m18_l6",
        title: "Create Variable",
        description: "Create or update a repository variable.",
        concept:
          "gh variable set manages plain configuration values used by GitHub Actions. Sensitive credentials should use secrets instead.",

        tasks: [
          {
            id: "t_variable_set",
            instruction: "Set repository variable NODE_ENV to production.",
            hint: "Use 'gh variable set NODE_ENV --body \"production\"'",
            expected:
              /^gh\s+variable\s+set\s+NODE_ENV\s+(?:--body|-b)\s+["']production["']$/,
            successMsg: "✓ Set variable NODE_ENV.",
          },
        ],
      },

      {
        id: "m18_l7",
        title: "Update Variable",
        description: "Replace the value of an existing variable.",
        concept:
          "Running gh variable set again with the same variable name updates the existing variable value.",

        tasks: [
          {
            id: "t_variable_update",
            instruction: "Change NODE_ENV to staging.",
            hint: "Use 'gh variable set NODE_ENV --body \"staging\"'",
            expected:
              /^gh\s+variable\s+set\s+NODE_ENV\s+(?:--body|-b)\s+["']staging["']$/,
            successMsg: "✓ Updated variable NODE_ENV.",
          },
        ],
      },

      {
        id: "m18_l8",
        title: "Environment Variable",
        description: "Create configuration scoped to a deployment environment.",
        concept:
          "Environment variables let the same workflow use different non-sensitive settings for environments such as development, staging, and production.",

        tasks: [
          {
            id: "t_variable_environment",
            instruction:
              "Set API_URL to https://api.example.com for the production environment.",
            hint: "Use 'gh variable set API_URL --body \"https://api.example.com\" --env production'",
            expected:
              /^gh\s+variable\s+set\s+API_URL\s+(?:--body|-b)\s+["']https:\/\/api\.example\.com["']\s+(?:--env|-e)\s+production$/,
            successMsg: "✓ Set API_URL for production.",
          },
        ],
      },

      {
        id: "m18_l9",
        title: "Delete Variable",
        description:
          "Remove repository configuration that is no longer required.",
        concept:
          "gh variable delete removes a variable from the selected repository, environment, or organization scope.",

        tasks: [
          {
            id: "t_variable_delete",
            instruction: "Delete repository variable OLD_CONFIG.",
            hint: "Use 'gh variable delete OLD_CONFIG'",
            expected: /^gh\s+variable\s+(?:delete|remove)\s+OLD_CONFIG$/,
            successMsg: "✓ Deleted variable OLD_CONFIG.",
          },
        ],
      },

      {
        id: "m18_l10",
        title: "Secret vs Variable",
        description: "Choose the correct storage type for configuration.",
        concept:
          "Use secrets for sensitive values such as passwords, private tokens, signing keys, and credentials. Use variables for non-sensitive configuration whose value does not need confidentiality.",

        tasks: [
          {
            id: "t_secret_api_token",
            instruction: "Store API_TOKEN as a GitHub Actions secret.",
            hint: "Use 'gh secret set API_TOKEN'",
            expected: /^gh\s+secret\s+set\s+API_TOKEN$/,
            successMsg: "✓ API_TOKEN stored as an encrypted GitHub secret.",
          },
        ],
      },
    ],
  },

  // =========================================================
  // MODULE 19 — GITHUB RELEASES
  // =========================================================
  {
    id: "m19",
    title: "19. GitHub Releases",
    description:
      "Create, inspect, publish, download, edit, and manage software releases from the terminal.",
    icon: <GitHubMark size={18} />,

    levels: [
      {
        id: "m19_l1",
        title: "List Releases",
        description: "See releases published in the current repository.",
        concept:
          "GitHub Releases package important versions of your software around Git tags. gh release list shows releases, their tags, and release state.",

        tasks: [
          {
            id: "t_release_list",
            instruction: "List releases in the current repository.",
            hint: "Use 'gh release list'",
            expected: /^gh\s+release\s+list$/,
            successMsg: "v1.1.0  Latest  v1.1.0\nv1.0.0          v1.0.0",
          },
        ],
      },

      {
        id: "m19_l2",
        title: "View a Release",
        description: "Inspect release information and assets.",
        concept:
          "gh release view displays information about a specific release. If no tag is provided, GitHub CLI can show the latest release.",

        tasks: [
          {
            id: "t_release_view",
            instruction: "View release v1.0.0.",
            hint: "Use 'gh release view v1.0.0'",
            expected: /^gh\s+release\s+view\s+v1\.0\.0$/,
            successMsg:
              "Version 1.0.0\nTag: v1.0.0\nRelease information displayed.",
          },
        ],
      },

      {
        id: "m19_l3",
        title: "Create a Release",
        description: "Publish a GitHub release from a Git tag.",
        concept:
          "gh release create publishes a GitHub Release. If the supplied tag does not already exist, GitHub CLI can create it from the repository's default branch.",

        tasks: [
          {
            id: "t_release_create",
            instruction: "Create release v1.0.0.",
            hint: "Use 'gh release create v1.0.0'",
            expected: /^gh\s+release\s+create\s+v1\.0\.0$/,
            successMsg: "✓ Created release v1.0.0.",
          },
        ],
      },

      {
        id: "m19_l4",
        title: "Generate Release Notes",
        description: "Let GitHub automatically generate release notes.",
        concept:
          "GitHub can generate release notes from merged pull requests and repository history. This reduces the work required to manually construct basic release notes.",

        tasks: [
          {
            id: "t_release_generate_notes",
            instruction:
              "Create release v1.1.0 and automatically generate its release notes.",
            hint: "Use 'gh release create v1.1.0 --generate-notes'",
            expected: /^gh\s+release\s+create\s+v1\.1\.0\s+--generate-notes$/,
            successMsg:
              "✓ Created release v1.1.0 with generated release notes.",
          },
        ],
      },

      {
        id: "m19_l5",
        title: "Create a Draft Release",
        description: "Prepare a release without publishing it immediately.",
        concept:
          "Draft releases let a team prepare release notes and assets before making the release visible as a normal published release.",

        tasks: [
          {
            id: "t_release_draft",
            instruction: "Create v1.2.0 as a draft release.",
            hint: 'Use \'gh release create v1.2.0 --draft --title "Version 1.2.0" --notes "Draft release"\'',
            expected:
              /^gh\s+release\s+create\s+v1\.2\.0\s+--draft\s+--title\s+["']Version 1\.2\.0["']\s+--notes\s+["']Draft release["']$/,
            successMsg: "✓ Draft release v1.2.0 created.",
          },
        ],
      },

      {
        id: "m19_l6",
        title: "Create a Prerelease",
        description:
          "Publish a version that is not considered production-stable.",
        concept:
          "Prereleases are useful for alpha, beta, and release-candidate versions. They indicate that the version is available but is not yet the normal stable release.",

        tasks: [
          {
            id: "t_release_prerelease",
            instruction: "Create v2.0.0-beta.1 as a prerelease.",
            hint: "Use 'gh release create v2.0.0-beta.1 --prerelease --generate-notes'",
            expected:
              /^gh\s+release\s+create\s+v2\.0\.0-beta\.1\s+--prerelease\s+--generate-notes$/,
            successMsg: "✓ Prerelease v2.0.0-beta.1 created.",
          },
        ],
      },

      {
        id: "m19_l7",
        title: "Upload a Release Asset",
        description: "Attach a build artifact to an existing release.",
        concept:
          "Release assets are downloadable files associated with a release. Examples include compiled binaries, archives, installers, checksums, and mobile application packages.",

        tasks: [
          {
            id: "t_release_upload",
            instruction: "Upload dist/app.zip to release v1.0.0.",
            hint: "Use 'gh release upload v1.0.0 dist/app.zip'",
            expected: /^gh\s+release\s+upload\s+v1\.0\.0\s+dist\/app\.zip$/,
            successMsg: "✓ Uploaded dist/app.zip to v1.0.0.",
          },
        ],
      },

      {
        id: "m19_l8",
        title: "Download Release Assets",
        description: "Download files attached to a release.",
        concept:
          "gh release download retrieves assets belonging to a release. This is useful for testing artifacts or downloading published binaries without using the browser.",

        tasks: [
          {
            id: "t_release_download",
            instruction: "Download all assets from release v1.0.0.",
            hint: "Use 'gh release download v1.0.0'",
            expected: /^gh\s+release\s+download\s+v1\.0\.0$/,
            successMsg: "✓ Release assets downloaded.",
          },
        ],
      },

      {
        id: "m19_l9",
        title: "Edit a Release",
        description: "Change information associated with a published release.",
        concept:
          "gh release edit can update properties such as the release title, notes, target, draft state, and prerelease state.",

        tasks: [
          {
            id: "t_release_edit",
            instruction:
              "Change the title of v1.0.0 to 'Version 1.0.0 Stable'.",
            hint: "Use 'gh release edit v1.0.0 --title \"Version 1.0.0 Stable\"'",
            expected:
              /^gh\s+release\s+edit\s+v1\.0\.0\s+--title\s+["']Version 1\.0\.0 Stable["']$/,
            successMsg: "✓ Release v1.0.0 updated.",
          },
        ],
      },

      {
        id: "m19_l10",
        title: "Delete a Release",
        description: "Remove an obsolete GitHub release.",
        concept:
          "Deleting a GitHub Release removes the release object. Its Git tag is separate unless you explicitly request tag cleanup.",

        tasks: [
          {
            id: "t_release_delete",
            instruction:
              "Delete release v0.9.0 without an interactive confirmation.",
            hint: "Use 'gh release delete v0.9.0 --yes'",
            expected: /^gh\s+release\s+delete\s+v0\.9\.0\s+(?:--yes|-y)$/,
            successMsg: "✓ Deleted release v0.9.0.",
          },
        ],
      },
    ],
  },

  // =========================================================
  // MODULE 20 — GITHUB SEARCH
  // =========================================================
  {
    id: "m20",
    title: "20. GitHub Search",
    description:
      "Search repositories, issues, pull requests, code, and commits across GitHub directly from the terminal.",
    icon: <GitHubMark size={18} />,

    levels: [
      {
        id: "m20_l1",
        title: "Search Repositories",
        description: "Find GitHub repositories matching a search term.",
        concept:
          "gh search repos searches repositories across GitHub. Search becomes especially useful when combined with filters such as language, owner, visibility, stars, forks, and creation date.",

        tasks: [
          {
            id: "t_search_repos",
            instruction: "Search GitHub repositories for 'postgresql'.",
            hint: "Use 'gh search repos postgresql'",
            expected: /^gh\s+search\s+repos\s+postgresql$/,
            successMsg: "Repository search results for 'postgresql' displayed.",
          },
        ],
      },

      {
        id: "m20_l2",
        title: "Search Issues",
        description: "Search issues across GitHub.",
        concept:
          "gh search issues searches GitHub issue content. This is useful when finding reported bugs, known problems, feature requests, or discussions about a particular error.",

        tasks: [
          {
            id: "t_search_issues",
            instruction: "Search issues for the phrase 'connection timeout'.",
            hint: "Use 'gh search issues \"connection timeout\"'",
            expected: /^gh\s+search\s+issues\s+["']connection timeout["']$/,
            successMsg: "Issue search results displayed.",
          },
        ],
      },

      {
        id: "m20_l3",
        title: "Search Pull Requests",
        description: "Find pull requests matching a topic or phrase.",
        concept:
          "gh search prs searches pull requests across GitHub. It can help investigate how other projects implemented a feature or fixed a particular problem.",

        tasks: [
          {
            id: "t_search_prs",
            instruction: "Search pull requests for 'authentication'.",
            hint: "Use 'gh search prs authentication'",
            expected: /^gh\s+search\s+prs\s+authentication$/,
            successMsg: "Pull request search results displayed.",
          },
        ],
      },

      {
        id: "m20_l4",
        title: "Search Code",
        description: "Search code stored in GitHub repositories.",
        concept:
          "gh search code searches indexed source code. Repository filters can narrow the search when you want to locate a symbol, configuration string, TODO, or implementation inside one project.",

        tasks: [
          {
            id: "t_search_code",
            instruction: "Search for TODO inside the repository user/project.",
            hint: "Use 'gh search code \"TODO\" --repo user/project'",
            expected:
              /^gh\s+search\s+code\s+["']TODO["']\s+(?:--repo|-R)\s+user\/project$/,
            successMsg: "Code search results for TODO displayed.",
          },
        ],
      },

      {
        id: "m20_l5",
        title: "Search Commits",
        description: "Search commit history across GitHub.",
        concept:
          "gh search commits searches commit metadata and messages. It can help find when a particular fix or change was committed across repositories.",

        tasks: [
          {
            id: "t_search_commits",
            instruction: "Search commits for the phrase 'fix login'.",
            hint: "Use 'gh search commits \"fix login\"'",
            expected: /^gh\s+search\s+commits\s+["']fix login["']$/,
            successMsg: "Commit search results displayed.",
          },
        ],
      },
    ],
  },

  // =========================================================
  // MODULE 21 — GITHUB API WITH GH
  // =========================================================
  {
    id: "m21",
    title: "21. GitHub API with gh",
    description: "Call GitHub REST and GraphQL APIs directly from GitHub CLI.",
    icon: <TerminalSquare size={18} />,

    levels: [
      {
        id: "m21_l1",
        title: "Make a GET Request",
        description: "Retrieve GitHub API data from the terminal.",
        concept:
          "gh api sends authenticated requests to the GitHub API. It automatically uses your GitHub CLI authentication, so you usually do not need to manually construct Authorization headers.",

        tasks: [
          {
            id: "t_api_get_repo",
            instruction:
              "Request API information for the current GitHub repository.",
            hint: "Use 'gh api repos/{owner}/{repo}'",
            expected: /^gh\s+api\s+repos\/\{owner\}\/\{repo\}$/,
            successMsg: '{"name":"project","full_name":"user/project",...}',
          },
        ],
      },

      {
        id: "m21_l2",
        title: "Filter JSON with jq",
        description: "Extract only the API fields you need.",
        concept:
          "The --jq option lets GitHub CLI filter JSON responses using jq expressions. This is useful in scripts where you need one value instead of the complete API response.",

        tasks: [
          {
            id: "t_api_jq",
            instruction:
              "Request your GitHub account and output only your login.",
            hint: "Use \"gh api user --jq '.login'\"",
            expected: /^gh\s+api\s+user\s+--jq\s+["']\.login["']$/,
            successMsg: "alex",
          },
        ],
      },

      {
        id: "m21_l3",
        title: "Send Query Parameters",
        description: "Pass parameters to a GET API endpoint.",
        concept:
          "Adding fields normally changes gh api to POST automatically. When you want fields to become GET query parameters, explicitly specify --method GET.",

        tasks: [
          {
            id: "t_api_get_params",
            instruction:
              "Request only open issues from the current repository.",
            hint: "Use 'gh api repos/{owner}/{repo}/issues --method GET -f state=open'",
            expected:
              /^gh\s+api\s+repos\/\{owner\}\/\{repo\}\/issues\s+--method\s+GET\s+-f\s+state=open$/,
            successMsg: "Open issues returned from the GitHub API.",
          },
        ],
      },

      {
        id: "m21_l4",
        title: "Make a POST Request",
        description: "Create a resource using the GitHub REST API.",
        concept:
          "gh api can send POST requests and include fields in the request body. This gives you access to GitHub functionality even when there is no specialized gh subcommand for your workflow.",

        tasks: [
          {
            id: "t_api_post_issue",
            instruction:
              "Create an issue titled 'API-created issue' using the GitHub API.",
            hint: "Use 'gh api repos/{owner}/{repo}/issues --method POST -f title=\"API-created issue\"'",
            expected:
              /^gh\s+api\s+repos\/\{owner\}\/\{repo\}\/issues\s+--method\s+POST\s+-f\s+title=["']API-created issue["']$/,
            successMsg: "Issue created successfully through the GitHub API.",
          },
        ],
      },

      {
        id: "m21_l5",
        title: "Make a PATCH Request",
        description: "Update an existing GitHub API resource.",
        concept:
          "The --method option lets you explicitly select HTTP methods such as GET, POST, PATCH, PUT, and DELETE when supported by the API endpoint.",

        tasks: [
          {
            id: "t_api_patch_issue",
            instruction: "Close issue #23 through the REST API.",
            hint: "Use 'gh api repos/{owner}/{repo}/issues/23 --method PATCH -f state=closed'",
            expected:
              /^gh\s+api\s+repos\/\{owner\}\/\{repo\}\/issues\/23\s+--method\s+PATCH\s+-f\s+state=closed$/,
            successMsg: "Issue #23 updated to closed.",
          },
        ],
      },

      {
        id: "m21_l6",
        title: "Paginate API Results",
        description: "Automatically retrieve multiple API result pages.",
        concept:
          "Many GitHub REST endpoints paginate large result sets. --paginate tells GitHub CLI to continue requesting subsequent pages rather than returning only the first page.",

        tasks: [
          {
            id: "t_api_paginate",
            instruction:
              "Retrieve every page of issues for the current repository.",
            hint: "Use 'gh api repos/{owner}/{repo}/issues --paginate'",
            expected:
              /^gh\s+api\s+repos\/\{owner\}\/\{repo\}\/issues\s+--paginate$/,
            successMsg: "All available result pages retrieved.",
          },
        ],
      },

      {
        id: "m21_l7",
        title: "Use the GraphQL API",
        description: "Send a GraphQL query through GitHub CLI.",
        concept:
          "gh api graphql sends requests to GitHub's GraphQL API. Fields passed alongside the query can be used as GraphQL variables.",

        tasks: [
          {
            id: "t_api_graphql",
            instruction:
              "Use GraphQL to retrieve the login of the authenticated viewer.",
            hint: "Use \"gh api graphql -f query='query { viewer { login } }'\"",
            expected:
              /^gh\s+api\s+graphql\s+-f\s+query=["']query\s*\{\s*viewer\s*\{\s*login\s*\}\s*\}["']$/,
            successMsg: '{"data":{"viewer":{"login":"alex"}}}',
          },
        ],
      },
    ],
  },

  // =========================================================
  // MODULE 22 — REAL-WORLD COLLABORATION WORKFLOW
  // =========================================================
  {
    id: "m22",
    title: "22. Real-World Collaboration Workflow",
    description:
      "Combine Git and GitHub CLI into the workflow used for everyday team development.",
    icon: <GitMerge size={18} />,

    levels: [
      {
        id: "m22_l1",
        title: "Clone the Team Repository",
        description: "Begin work from the team's GitHub repository.",
        concept:
          "A typical development task starts by obtaining a local copy of the team's repository. GitHub CLI can clone the repository and configure its Git remote.",

        tasks: [
          {
            id: "t_flow_clone",
            instruction: "Clone user/project using GitHub CLI.",
            hint: "Use 'gh repo clone user/project'",
            expected: /^gh\s+repo\s+clone\s+user\/project$/,
            successMsg: "✓ Repository cloned.",
          },
        ],
      },

      {
        id: "m22_l2",
        title: "Update Main",
        description: "Start new work from the latest main branch.",
        concept:
          "Before creating a feature branch, update your local main branch. Starting from an outdated branch increases the chance of unnecessary conflicts.",

        tasks: [
          {
            id: "t_flow_switch_main",
            instruction: "Switch to main.",
            hint: "Use 'git switch main'",
            expected: /^git\s+(?:switch|checkout)\s+main$/,
            successMsg: "Switched to branch 'main'.",
          },

          {
            id: "t_flow_pull_main",
            instruction: "Fast-forward your local main from origin/main.",
            hint: "Use 'git pull --ff-only origin main'",
            expected: /^git\s+pull\s+--ff-only\s+origin\s+main$/,
            successMsg: "Local main is up to date with origin/main.",
          },
        ],
      },

      {
        id: "m22_l3",
        title: "Create a Feature Branch",
        description: "Keep feature development isolated from main.",
        concept:
          "Team workflows normally avoid committing feature work directly to main. A dedicated feature branch keeps the change isolated until review.",

        tasks: [
          {
            id: "t_flow_branch",
            instruction: "Create and switch to feature/profile-page.",
            hint: "Use 'git switch -c feature/profile-page'",
            expected:
              /^git\s+(?:switch\s+-c|checkout\s+-b)\s+feature\/profile-page$/,
            successMsg: "Switched to new branch 'feature/profile-page'.",
          },
        ],
      },

      {
        id: "m22_l4",
        title: "Review Your Changes",
        description: "Inspect the working tree before staging files.",
        concept:
          "Before creating commits, inspect the repository state. This prevents unrelated files, generated content, or secrets from accidentally entering the commit.",

        tasks: [
          {
            id: "t_flow_status",
            instruction: "Check your working-tree status.",
            hint: "Use 'git status'",
            expected: /^git\s+status$/,
            successMsg: "Modified files displayed.",
          },

          {
            id: "t_flow_diff",
            instruction: "Review the unstaged changes.",
            hint: "Use 'git diff'",
            expected: /^git\s+diff$/,
            successMsg: "Working-tree diff displayed.",
          },
        ],
      },

      {
        id: "m22_l5",
        title: "Stage and Commit",
        description: "Create a clear unit of work for the feature.",
        concept:
          "A good feature commit should contain related changes and a descriptive message. Reviewing the diff before staging helps keep commits focused.",

        tasks: [
          {
            id: "t_flow_add",
            instruction: "Stage all feature changes.",
            hint: "Use 'git add .'",
            expected: /^git\s+add\s+\.$/,
            successMsg: "Feature changes staged.",
          },

          {
            id: "t_flow_commit",
            instruction: "Commit the changes with message 'Add profile page'.",
            hint: "Use 'git commit -m \"Add profile page\"'",
            expected: /^git\s+commit\s+-m\s+["']Add profile page["']$/,
            successMsg: "[feature/profile-page a1b2c3d] Add profile page",
          },
        ],
      },

      {
        id: "m22_l6",
        title: "Sync Before Push",
        description:
          "Update your feature branch with recent changes from main.",
        concept:
          "If main changed while you were developing, fetch the latest remote references and integrate those changes before opening the pull request. Rebasing can keep the feature branch history linear.",

        tasks: [
          {
            id: "t_flow_fetch",
            instruction: "Fetch the latest remote changes.",
            hint: "Use 'git fetch origin'",
            expected: /^git\s+fetch\s+origin$/,
            successMsg: "Latest remote references fetched.",
          },

          {
            id: "t_flow_rebase",
            instruction: "Rebase your feature branch onto origin/main.",
            hint: "Use 'git rebase origin/main'",
            expected: /^git\s+rebase\s+origin\/main$/,
            successMsg: "Feature branch successfully rebased onto origin/main.",
          },
        ],
      },

      {
        id: "m22_l7",
        title: "Push the Feature Branch",
        description: "Publish your branch to GitHub.",
        concept:
          "The first push commonly sets an upstream tracking relationship so later git push and git pull commands know which remote branch belongs to the local branch.",

        tasks: [
          {
            id: "t_flow_push",
            instruction:
              "Push feature/profile-page and set its upstream branch.",
            hint: "Use 'git push -u origin feature/profile-page'",
            expected:
              /^git\s+push\s+(?:-u|--set-upstream)\s+origin\s+feature\/profile-page$/,
            successMsg: "Feature branch pushed and upstream configured.",
          },
        ],
      },

      {
        id: "m22_l8",
        title: "Create the Pull Request",
        description: "Submit the feature for team review.",
        concept:
          "The pull request connects your feature branch to the team's review process. Explicit base and head branches make the intended merge direction clear.",

        tasks: [
          {
            id: "t_flow_pr",
            instruction:
              "Create a pull request from feature/profile-page into main.",
            hint: 'Use \'gh pr create --base main --head feature/profile-page --title "Add profile page" --body "Implements the new profile page"\'',
            expected:
              /^gh\s+pr\s+create\s+--base\s+main\s+--head\s+feature\/profile-page\s+--title\s+["']Add profile page["']\s+--body\s+["']Implements the new profile page["']$/,
            successMsg: "✓ Pull request created.",
          },
        ],
      },

      {
        id: "m22_l9",
        title: "Check Pull Request Status",
        description: "Confirm the PR and its CI state.",
        concept:
          "After opening a PR, review its metadata and automated checks before asking teammates to merge it.",

        tasks: [
          {
            id: "t_flow_pr_view",
            instruction: "View the pull request for your current branch.",
            hint: "Use 'gh pr view'",
            expected: /^gh\s+pr\s+view$/,
            successMsg: "Current pull request displayed.",
          },

          {
            id: "t_flow_pr_checks",
            instruction: "Check CI checks for the current pull request.",
            hint: "Use 'gh pr checks'",
            expected: /^gh\s+pr\s+checks$/,
            successMsg: "Pull request checks displayed.",
          },
        ],
      },

      {
        id: "m22_l10",
        title: "Review a Teammate's Pull Request",
        description: "Inspect another developer's proposed changes locally.",
        concept:
          "Code review should inspect the actual diff and, when useful, run the branch locally before approving it.",

        tasks: [
          {
            id: "t_flow_checkout_pr",
            instruction: "Checkout teammate pull request #42.",
            hint: "Use 'gh pr checkout 42'",
            expected: /^gh\s+pr\s+checkout\s+42$/,
            successMsg: "Pull request #42 checked out locally.",
          },

          {
            id: "t_flow_diff_pr",
            instruction: "Inspect the diff for pull request #42.",
            hint: "Use 'gh pr diff 42'",
            expected: /^gh\s+pr\s+diff\s+42$/,
            successMsg: "Pull request #42 diff displayed.",
          },
        ],
      },

      {
        id: "m22_l11",
        title: "Approve the Pull Request",
        description: "Submit a formal approval after review.",
        concept:
          "An approval communicates that the reviewer considers the proposed changes acceptable according to the team's review requirements.",

        tasks: [
          {
            id: "t_flow_approve",
            instruction: "Approve pull request #42.",
            hint: "Use 'gh pr review 42 --approve'",
            expected: /^gh\s+pr\s+review\s+42\s+(?:--approve|-a)$/,
            successMsg: "✓ Pull request #42 approved.",
          },
        ],
      },

      {
        id: "m22_l12",
        title: "Merge and Delete Remote Branch",
        description: "Complete the reviewed pull request.",
        concept:
          "After required reviews and checks pass, the PR can be merged. Deleting the merged feature branch keeps the remote repository clean.",

        tasks: [
          {
            id: "t_flow_merge",
            instruction:
              "Squash merge pull request #42 and delete its remote branch.",
            hint: "Use 'gh pr merge 42 --squash --delete-branch'",
            expected:
              /^gh\s+pr\s+merge\s+42\s+(?:--squash|-s)\s+--delete-branch$/,
            successMsg: "✓ Pull request #42 merged and remote branch deleted.",
          },
        ],
      },

      {
        id: "m22_l13",
        title: "Sync Local Main",
        description: "Return your local repository to the latest shared state.",
        concept:
          "After a PR merges, switch back to main and update it from the remote. This gives you a clean current base for your next piece of work.",

        tasks: [
          {
            id: "t_flow_return_main",
            instruction: "Switch back to main.",
            hint: "Use 'git switch main'",
            expected: /^git\s+(?:switch|checkout)\s+main$/,
            successMsg: "Switched to branch 'main'.",
          },

          {
            id: "t_flow_update_main",
            instruction: "Update main from origin using fast-forward only.",
            hint: "Use 'git pull --ff-only origin main'",
            expected: /^git\s+pull\s+--ff-only\s+origin\s+main$/,
            successMsg: "Local main synchronized with origin/main.",
          },
        ],
      },

      {
        id: "m22_l14",
        title: "Delete the Local Feature Branch",
        description: "Clean up branches whose work has already been merged.",
        concept:
          "Once a feature has safely reached main, its local branch is usually no longer needed. Removing merged branches keeps the repository easier to navigate.",

        tasks: [
          {
            id: "t_flow_delete_branch",
            instruction: "Delete the local feature/profile-page branch.",
            hint: "Use 'git branch -d feature/profile-page'",
            expected: /^git\s+branch\s+-d\s+feature\/profile-page$/,
            successMsg: "Deleted branch feature/profile-page.",
          },
        ],
      },

      {
        id: "m22_l15",
        title: "Complete Team Workflow",
        description:
          "Understand the complete Git and GitHub collaboration loop.",
        concept:
          "The normal collaboration loop is: update main, create a feature branch, make focused commits, synchronize with upstream work, push, open a pull request, run CI, review, merge, update main again, and clean up the finished branch.",

        tasks: [
          {
            id: "t_flow_final_status",
            instruction:
              "Confirm that your repository is clean after completing the workflow.",
            hint: "Use 'git status'",
            expected: /^git\s+status$/,
            successMsg:
              "On branch main\nYour branch is up to date with 'origin/main'.\nnothing to commit, working tree clean",
          },
        ],
      },
    ],
  },
];
